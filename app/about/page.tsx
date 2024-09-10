import { submitFeedback } from '@/actions/feedback'
import Rating from '@/components/Rating'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About',
    description: 'About TLCverse',
}

export default function About() {
    return (<>
        <div className='p-5 pb-16'>
            <h2 className='text-2xl font-medium mt-5 mb-2'>About TLCVerse</h2>
            <p>In line with the United Nations SDG goals, we aim to tackle the problem of poor quality of education by creating a platform that not only teaches students but allows healthy and interactive competition between them to improve the educational environment. The application will help students who are preparing for major qualification exams and serve as a valuable tool for their learning.</p>
        </div>
        <div className='lg:flex flex-row-reverse'>
            <div className='p-5 pb-10 lg:w-[48rem]'>
                <h2 className='text-2xl font-medium mb-2'>Meet the Team</h2>
                <div className='flex flex-wrap gap-y-5 justify-around'>
                    <TeamMember name='Mr. Benedict' roles={['Project Manager', 'Team Mentor']} />
                    <TeamMember name='David Emmanuel' roles={['Technical Lead', 'UI/UX Support']} />
                    <TeamMember name='Joshua' roles={['Backend Developer', 'Content Support']} />
                    <TeamMember name='Inioluwa Akindele' roles={['Content Lead', 'Research Support']} />
                    <TeamMember name='Odinaka' roles={['Research Lead', 'Content Support']} />
                </div>
            </div>
            <div className='flex-1 p-5 flex flex-col items-center'>
                <h3 className='text-xl font-medium mb-2'>Leave your feedback</h3>
                <form action={submitFeedback} className='w-full max-w-96 flex flex-col items-center gap-2'>
                    <textarea rows={5} name='feedback' className='rounded-md w-full p-2' />
                    <Rating name='rating' />
                    <button type='submit' className='px-5 py-2 bg-blue-500 text-white font-medium rounded m-auto'>Submit Feedback</button>
                </form>
            </div>
        </div>
    </>)
}

function TeamMember({ name, roles }: {
    name: string,
    roles: string[],
}) {
    // TODO add images
    return <div className='card w-full max-w-80 bg-white'>
        <h3 className='text-center text-neutral-600 font-medium'>{name}</h3>
        <div className='flex flex-wrap gap-1 justify-center'>
            {roles.map((role, i) => <p key={i}>{role}</p>)}
        </div>
    </div>
}