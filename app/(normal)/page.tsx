import FeatureCard from '@/components/FeatureCard'
import GetStarted from '@/components/GetStarted'

export default function Page() {
  // TODO add section to browse subjects

  return (<>
    <div className='text-center h-[75vh] flex flex-col justify-center items-center gap-5 p-2'>
      <h1 className='text-4xl font-medium italic'>Teach, Learn, Connect</h1>
      <p className='italic'>Unlock potential with with personalised tutoring and structured learning</p>
      <div className='my-5 w-48'>
        <GetStarted />
      </div>
    </div>
    <div className='bg-black bg-texture text-white w-full p-5'>
      <h2 className='text-2xl font-medium mb-2'>Features</h2>
      <ul className='flex flex-wrap justify-around gap-2 gap-y-5 items-stretch'>
        <FeatureCard feature='Find a Tutor' link='/connect?role=tutor'>
          <p>Search for top tutors in various subjects and book personalised lessons</p>
        </FeatureCard>
        <FeatureCard feature='Multiplayer Game' link='/multiplayer'>
          <p>Challenge your friends in a fun, competitive quiz game and top the leaderboard</p>
        </FeatureCard>
        <FeatureCard feature='Connect' link='/connect'>
          <p>Connect with other students, parents, or tutors like yourself</p>
        </FeatureCard>
      </ul>
    </div>
  </>)
}
