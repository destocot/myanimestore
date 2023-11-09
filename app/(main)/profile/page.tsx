import AnimeMainCard from '@/components/AnimeMainCard'
import { getUserByClerkId } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'
import { FaInfoCircle } from 'react-icons/fa'

const getUser = async () => {
  const user = await getUserByClerkId()

  const data = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
    select: {
      username: true,
      animes: {
        select: {
          id: true,
          mal_id: true,
          title: true,
          main_picture: true,
        },
      },
    },
  })

  return data
}

const ProfilePage = async () => {
  const userWithAnime = await getUser()

  return (
    <main>
      <h2 className="my-2">{userWithAnime.username}&apos;s Profile</h2>
      <h3 className="my-2">Purchased Anime</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {userWithAnime.animes.length &&
          userWithAnime.animes.map((anime) => (
            <AnimeMainCard key={anime.id} anime={anime} profile={true} />
          ))}
      </div>
    </main>
  )
}
export default ProfilePage