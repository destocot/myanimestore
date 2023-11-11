import AddToCartBtn from '@/components/AddToCartBtn'
import { prisma } from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FaInfoCircle } from 'react-icons/fa'

export const dynamicParams = false

export async function generateStaticParams() {
  const anime = await prisma.anime.findMany({
    select: {
      mal_id: true,
    },
  })
  return anime.map((item) => ({
    id: item.mal_id.toString(),
  }))
}

const getAnimeDetails = async (id: number) => {
  const mal_id = +id

  try {
    const data = await prisma.anime.findUniqueOrThrow({
      where: {
        mal_id,
      },
    })
    return data
  } catch (error) {
    notFound()
  }
}

const getRelatedAnime = async (embedding: number[]) => {
  const related = await prisma.anime.aggregateRaw({
    pipeline: [
      {
        $vectorSearch: {
          queryVector: embedding,
          path: 'embeddings',
          limit: 6,
          numCandidates: 100,
          index: 'animeEmbeddingIndex',
        },
      },
      {
        $project: {
          title: 1,
          main_picture: 1,
          mal_id: 1,
        },
      },
    ],
  })

  if (!related || !Array.isArray(related)) return []

  return related.slice(1)
}

const AnimeDetailsPage = async ({ params }: { params: { id: number } }) => {
  const anime = await getAnimeDetails(params.id)
  const related = await getRelatedAnime(anime.embeddings)

  return (
    <main>
      <div className="grid grid-cols-[200px_auto] md:grid-cols-[300px_auto] mb-4">
        <Image
          src={anime.main_picture}
          alt="anime image"
          width={400}
          height={600}
          className="object-cover h-auto aspect-[2/3] max-w-[200px] md:max-w-[275px] border-2 border-transparent hover:border-blue-500 hover:cursor-pointer "
        />
        <div className="flex flex-col mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="mb-2">{anime.title}</h1>
            <div className="mx-2">
              <AddToCartBtn anime={anime} />
            </div>
          </div>
          <div className="flex gap-5">
            <span className="font-semibold">Genres:</span>
            <ul className="flex flex-wrap gap-2">
              {anime.genres.map((genre) => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>
          </div>
          <p className="flex-1 hidden md:block">{anime.synopsis}</p>
        </div>
      </div>
      <p className="px-2 md:hidden text-justify">{anime.synopsis}</p>
      <h2>Related Anime</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {related.map((anime) => (
          <div
            className="relative border-2 border-transparent transition-all hover:border-white max-w-[215px] mx-auto"
            key={anime._id}
          >
            <Image
              src={anime.main_picture}
              alt="anime image"
              width={400}
              height={600}
              className="object-cover h-[auto] aspect-[2/3]   hover:cursor-pointer"
            />
            <div className="w-full h-full top-0 left-0 absolute bg-white/60 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-all gap-4 px-2 text-black">
              <p className="font-semibold text-center">{anime.title}</p>
              <div className="flex gap-4">
                <Link
                  aria-label="anime details"
                  href={`/anime/${anime.mal_id}`}
                  className="hover:scale-125 text-3xl transition-all"
                >
                  <FaInfoCircle />
                </Link>
                <AddToCartBtn anime={anime} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
export default AnimeDetailsPage
