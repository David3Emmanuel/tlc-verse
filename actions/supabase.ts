'use server'


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl) throw new Error('Missing SUPABASE_URL')
if (!supabaseKey) throw new Error('Missing SUPABASE_KEY')

const supabase = async () => await createClient(supabaseUrl, supabaseKey)
export default supabase