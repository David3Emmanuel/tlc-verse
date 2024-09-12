'use client'

import { useState } from 'react'
import ProfilePic from '@/components/ProfilePic'

export default function FileUpload({ name, id }: {
    name: string,
    id: string,
}) {
    const [file, setFile] = useState<File | null>(null)

    return (<div className='flex gap-5 items-center'>
        <label htmlFor={id} className='text-center mx-auto p-2 border border-neutral-300 bg-neutral-100 rounded w-32'>Upload</label>
        {/* <div className={`${styles.uploadContainer} card no-hover bg-neutral-50 shadow`}>
                <p>Drag and drop an image or upload from computer</p>
                <div className={styles.uploadOverlay}>
                    <p>Overlay</p>
                </div>
            </div> */}
        <input type='file' name={name} id={id} className='hidden' onChange={e => {
            const _file = e.target.files?.item(0) || null
            setFile(_file)
        }} />
        {file && <>
        <p>Preview</p>
        <ProfilePic src={URL.createObjectURL(file)} />
        </>}
    </div>)
}