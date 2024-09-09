import { submitFeedback } from '@/actions/feedback'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About',
    description: 'About TLCverse',
}

export default function About() {
    return (<>
        <h2>About TLCVerse</h2>
        <p>In line with the United Nations SDG goals, we aim to tackle the problem of poor quality of education by creating a platform that not only teaches students but allows healthy and interactive competition between them to improve the educational environment. The application will help students who are preparing for major qualification exams and serve as a valuable tool for their learning.</p>
        <h2>Meet the Team</h2>
        <div>
            <TeamMember name='Mr. Benedict' roles={['Project Manager', 'Team Mentor']} />
            <TeamMember name='David Emmanuel' roles={['Technical Lead', 'UI/UX Support']} />
            <TeamMember name='Joshua' roles={['Backend Developer', 'Content Support']} />
            <TeamMember name='Inioluwa Akindele' roles={['Content Lead', 'Research Support']} />
            <TeamMember name='Odinaka' roles={['Research Lead', 'Content Support']} />
        </div>
        <h3>Leave your feedback</h3>
        <form action={submitFeedback}>
            <textarea name='feedback' required>
            </textarea>
            <button type='submit'>Submit Feedback</button>
        </form>
    </>)
}

function TeamMember({ name, roles }: {
    name: string,
    roles: string[],
}) {
    // TODO add images
    return <div>
        <h3>{name}</h3>
        {roles.map((role, i) => <p key={i}>{role}</p>)}
    </div>
}