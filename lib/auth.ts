import { auth } from '@clerk/nextjs'
import { prisma } from './db'

export const getUserByClerkId = async () => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('no user id found')
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
      username: true,
    },
  })

  return user
}
