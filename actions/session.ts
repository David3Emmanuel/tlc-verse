import 'server-only'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { Session } from '@/lib/definitions'
import { cookies } from 'next/headers'


const sessionKey = process.env.SESSION_KEY
if (!sessionKey) throw new Error('Missing SESSION_KEY')
const encodedKey = new TextEncoder().encode(sessionKey)

export async function encrypt(payload: Session) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload as Session
    } catch (error) {
        console.log('Failed to verify session')
    }
}

export async function createSession(userId: string) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, expires } as Session)

    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires,
        sameSite: 'lax',
        path: '/',
    })
}

export async function updateSession() {
    const session = cookies().get('session')?.value
    const payload = await decrypt(session)

    if (!session || !payload) {
        return null
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires,
        sameSite: 'lax',
        path: '/',
    })
}

export function deleteSession() {
    cookies().delete('session')
}

export function getSession() {
    const session = cookies().get('session')?.value
    return decrypt(session)
}
