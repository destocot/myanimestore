import Image from 'next/image'
import Link from 'next/link'
import { FaInfoCircle } from 'react-icons/fa'
import AddToCartBtn from './AddToCartBtn'
import { AnimeCardType } from '@/types/types'

const AnimeMainCard = ({
  anime,
  profile,
}: {
  profile?: boolean
  anime: AnimeCardType
}) => {
  return (
    <div
      className="relative border-2 border-transparent transition-all hover:border-white max-w-[200px] mx-auto"
      key={anime.id}
    >
      <img
        src={anime.main_picture}
        alt="anime image"
        width={400}
        height={600}
        className="object-cover h-[auto] aspect-[2/3] hover:cursor-pointer"
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
          {!profile && <AddToCartBtn anime={anime} />}
        </div>
      </div>
    </div>
  )
}
export default AnimeMainCard
