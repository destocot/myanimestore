import AnimeMainCard from '@/components/AnimeMainCard'
import SearchAnime from '@/components/SearchAnime'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/db'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'MyAnimeStore - Anime Search',
  description:
    'Search for your favorite anime series and movies on MyAnimeStore.',
}

const getSearchResults = async (query: string, page: number) => {
  const anime = await prisma.anime.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          synopsis: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
    take: 11,
    skip: 10 * (page - 1),
    select: {
      id: true,
      main_picture: true,
      mal_id: true,
      title: true,
    },
  })

  return anime
}

const SearchPage = async ({
  params,
}: {
  params: { query: string; page: number }
}) => {
  const query = params.query.replaceAll('%20', ' ')
  const searchResults = await getSearchResults(query, params.page)

  return (
    <main>
      <div className="my-2 flex flex-wrap justify-between items-center">
        <h2 className="flex-1 mr-2">
          Search results for <span className="italic">&quot;{query}&quot;</span>
        </h2>
        <div className="w-full lg:w-1/3">
          <SearchAnime />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 [&>*:nth-child(11)]:hidden">
        {searchResults.map((anime) => (
          <AnimeMainCard key={anime.id} anime={anime} />
        ))}
      </div>
      <div className="flex justify-end gap-4 m-2">
        {searchResults.length > 10 && (
          <Link href={`/search/${params.query}/page/${+params.page + 1}`}>
            <Button variant="default" className="text-white font-semibold">
              More
            </Button>
          </Link>
        )}
        {params.page > 1 && (
          <Link href={`/search/${params.query}/page/${+params.page - 1}`}>
            <Button variant="default" className="text-white font-semibold">
              Back
            </Button>
          </Link>
        )}
        {params.page <= 1 && (
          <Link href={`/search/${params.query}/page/${+params.page - 1}`}>
            <Button
              disabled={true}
              variant="secondary"
              className="text-white font-semibold"
            >
              <span className="opacity-0">Back</span>
            </Button>
          </Link>
        )}
      </div>
    </main>
  )
}
export default SearchPage
