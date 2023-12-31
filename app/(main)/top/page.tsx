import AnimeMainCard from '@/components/AnimeMainCard'
import { prisma } from '@/lib/db'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MyAnimeStore - Top 10 Anime',
  description:
    'Discover the top 10 anime on MyAnimeStore based on user ratings and reviews.',
}

const getTopAnime = async () => {
  const data = await prisma.anime.findMany({
    where: {
      mal_id: {
        in: [37965, 392, 66, 1029, 1689, 1818, 10800, 20057, 250, 5680],
      },
    },
    select: {
      id: true,
      main_picture: true,
      mal_id: true,
      title: true,
    },
  })

  return data
}

const TopPage = async () => {
  const topAnime = await getTopAnime()

  return (
    <main>
      <h2 className="my-2">Khurram&apos;s Top 10</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {!!topAnime.length &&
          topAnime.map((anime) => (
            <AnimeMainCard key={anime.id} anime={anime} />
          ))}
      </div>
    </main>
  )
}
export default TopPage
