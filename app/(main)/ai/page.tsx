import { Metadata } from 'next'
import Chat from './Chat'
import { getUserByClerkId } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'MyAnimeStore - Anime AI',
  description:
    'Explore advanced AI analysis and recommendations for anime content.',
}

const dailyCheckIn = async (id: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      gpt_points: true,
      refresh_date: true,
    },
  })

  const fullDay = 24 * 60 * 60 * 1000

  const date = new Date()

  if (+date - +user.refresh_date > fullDay) {
    const updated = await prisma.user.update({
      where: {
        id,
      },
      data: {
        gpt_points: user.gpt_points + 1,
        refresh_date: date,
      },
      select: {
        gpt_points: true,
      },
    })
    return { gpt_points: updated.gpt_points }
  } else {
    return { gpt_points: user.gpt_points }
  }
}

const AiPage = async () => {
  const user = await getUserByClerkId()
  const data = await dailyCheckIn(user.id)

  return (
    <main>
      <div className="mb-auto md:w-1/2 w-full px-2 md:px-0 shadow-2xl mx-auto">
        <h2>Ask AI For A Recommendation</h2>
        <h4 className=" mb-1">
          Points Remaining:{' '}
          <span
            className={`font-semibold ${
              data.gpt_points > 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {data.gpt_points}
          </span>{' '}
          (check-in daily for a free point)
        </h4>
        <Chat points={data.gpt_points} />
      </div>
    </main>
  )
}
export default AiPage
