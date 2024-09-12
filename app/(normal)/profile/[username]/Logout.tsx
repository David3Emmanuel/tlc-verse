'use client'

export default function Logout({deleteSession}: {deleteSession: () => void}) {
    return (
        <button onClick={() => deleteSession()} className='button'>Log Out</button>
    )
}