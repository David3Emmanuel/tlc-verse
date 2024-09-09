import Link from 'next/link'

export default function Page() {
  return (<>
    <div>
      <h1 className='text-4xl font-medium'>Teach, Learn, Connect</h1>
      <p className='italic'>Unlock potential with with personalised tutoring and structured learning</p>
      <button>Get Started</button>
    </div>
    <div>
      <h2>Features</h2>
      <ul>
        <Feature feature='Find a Tutor' link='/connect?role=tutor'>
          <p>Search for top tutors in various subjects and book personalised lessons</p>
        </Feature>
        <Feature feature='Multiplayer Game' link='/multiplayer'>
          <p>Challenge your friends in a fun, competitive quiz game and top the leaderboard</p>
        </Feature>
        <Feature feature='Connect' link='/connect'>
          <p>Connect with other students, parents, or tutors like yourself</p>
        </Feature>
      </ul>
    </div>
  </>)
}

function Feature({ feature, link, children }: {
  feature: string,
  link: string,
  children?: React.ReactNode,
}) {
  return (
    <li>
      <h3>{feature}</h3>
      {children}
      <Link href={link}>Learn more</Link>
    </li>
  )
}
