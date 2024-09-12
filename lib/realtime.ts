'use client'

import { createClient, RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import { RealtimeChannel } from '@supabase/supabase-js'
import { useCallback, useEffect, useRef, useState } from 'react'
import { WatchDBPayload } from '@/lib/definitions'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

if (!supabaseUrl) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
if (!supabaseKey) throw new Error('Missing NEXT_PUBLIC_SUPABASE_KEY')

const supabase = createClient(supabaseUrl, supabaseKey)

export function useBroadcast<Payload extends { [key: string]: any }>(channelName: string) {
    const [payload, setPayload] = useState<Payload | null>(null)
    const channel = useRef<RealtimeChannel | null>(null)

    const sendBroadcast = useCallback((payload: Payload) => {
        channel.current?.send({
            type: 'broadcast',
            event: 'message',
            payload,
        })
    }, [channel])

    useEffect(() => {
        if (!channel.current) {
            channel.current = supabase.channel(channelName, {
                config: {
                    broadcast: { self: true },
                },
            })
            channel.current.on(
                'broadcast',
                { event: 'message' },
                ({ payload: _payload }: { payload: Payload }) => {
                    console.log(_payload)
                    setPayload(_payload)
                }
            ).subscribe()
        }

        return () => {
            if (channel.current) {
                channel.current.unsubscribe()
                supabase.removeChannel(channel.current)
                channel.current = null
            }
        }
    }, [])

    return [payload, sendBroadcast] as [Payload, (payload: Payload) => void]
}

export function useWatchDB<T extends { id: ID }, ID>(tableName: string) {
    const [payload, setPayload] = useState<WatchDBPayload<T, ID> | null>(null)
    const [data, setData] = useState<T[] | null>()
    const channel = useRef<RealtimeChannel | null>(null)

    useEffect(() => {
        (async () => {
            if (payload === null) {
                const { data, error } = await supabase.from(tableName).select('*')
                if (error) throw new Error(error.message)
                setData(data)
            }
        })()
    }, [])

    useEffect(() => {
        if (!channel.current) {
            channel.current = supabase.channel(tableName)
            channel.current.on(
                'postgres_changes',
                { event: '*', schema: 'public', table: tableName },
                (rawPayload: RealtimePostgresChangesPayload<{ id?: ID, [key: string]: any; }>) => {
                    const payload = rawPayload as WatchDBPayload<T, ID>
                    setPayload(payload)
                    switch (payload.eventType) {
                        case 'INSERT':
                            setData(prev => prev ? [...prev, payload.new] : [payload.new])
                            break
                        case 'UPDATE':
                            setData(prev => prev ? [...prev.filter(v => v.id !== payload.old.id), payload.new] : [payload.new])
                            break
                        case 'DELETE':
                            setData(prev => prev ? [...prev.filter(v => v.id !== payload.old.id)] : prev)
                            break
                    }
                }
            ).subscribe()
        }

        return () => {
            if (channel.current) {
                channel.current.unsubscribe()
                supabase.removeChannel(channel.current)
                channel.current = null
            }
        }
    }, [])

    return [data, payload] as [(T[] | null), (WatchDBPayload<T, ID> | null)]
}