import { prisma } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()

  if (!user) {
    throw new Error('no user found')
  }

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  })

  if (!match) {
    const clerkId = user.id
    const email = user.emailAddresses[0].emailAddress
    const username = constructUsername(user)

    await prisma.user.create({
      data: {
        clerkId,
        email,
        username,
      },
    })
  }

  redirect('/')
}

const constructUsername = (user: User) => {
  let result = ''

  if (user.firstName) {
    result += user.firstName
  }

  if (user.lastName) {
    result += user.lastName
  }

  if (result.length) {
    result += user.id.slice(5, 7)
  } else {
    result += 'masuser'
    result += user.id.slice(5, 9)
  }

  return result
}

const RedirectPage = async () => {
  await createNewUser()

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-28 h-28 rounded-full border-t-blue-500 border-r-blue-500 animate-spin border-8"></div>
    </div>
  )
}
export default RedirectPage
