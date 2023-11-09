import { prisma } from '@/lib/db'
import Hero from '@/components/Hero'
import AnimeMainCard from '@/components/AnimeMainCard'

const getAnime = async (take: number, skip: number) => {
  const data = await prisma.anime.findMany({
    take,
    skip,
    select: {
      id: true,
      main_picture: true,
      mal_id: true,
      title: true,
    },
  })
  return data
}

const getRandom = async () => {
  const count = await prisma.anime.count()
  const x = Math.floor(Math.random() * count)

  const data = await prisma.anime.findMany({
    take: 5,
    skip: x,
    select: {
      id: true,
      main_picture: true,
      mal_id: true,
      title: true,
    },
  })
  return data
}

export default async function Home() {
  const set1 = await getAnime(5, 0)
  const set2 = await getRandom()

  return (
    <main>
      <Hero />
      <h2>Popular Picks</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {set1.map((anime) => (
          <AnimeMainCard key={anime.id} anime={anime} />
        ))}
      </div>
      <h2 className="my-2">Checkout Something New</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {set2.map((anime) => (
          <AnimeMainCard key={anime.id} anime={anime} />
        ))}
      </div>
    </main>
  )
}
