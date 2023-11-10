import { Button } from '@/components/ui/button'
import { UserButton, auth } from '@clerk/nextjs'
import Link from 'next/link'
import { FaHome, FaStar, FaStore, FaUser } from 'react-icons/fa'
import { FaMicrochip } from 'react-icons/fa6'
import CartToggle from './CartToggle'

const Navbar = async () => {
  const { userId }: { userId: string | null } = auth()

  return (
    <nav className="flex flex-wrap justify-between items-center pt-2">
      <Link href="/" className="flex mx-auto md:mx-0 gap-5 items-center">
        <h1 className="text-5xl sm:text-4xl">MyAnimeStore</h1>
        <FaStore className="text-5xl" />
      </Link>
      <ul className="flex mt-4 items-center mx-auto md:mx-0 gap-4">
        {!!userId ? (
          <>
            <Link href="/">
              <Button variant="secondary">
                <FaHome className="text-xl" />
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="default" className="text-white font-semibold">
                <FaUser className="text-lg" />
              </Button>
            </Link>
            <Link href="/top">
              <Button variant="default" className="text-white font-semibold">
                <FaStar className="text-lg" />
              </Button>
            </Link>
            <Link href="/ai" className="relative">
              <Button
                variant="destructive"
                className="text-white font-semibold"
              >
                <FaMicrochip className="text-lg" />
              </Button>
              <code className="absolute -top-4 right-0 text-sm whitespace-nowrap left-0 animate-bounce">
                Try AI
              </code>
            </Link>
            <div className="relative md:hidden">
              <CartToggle />
            </div>
            <UserButton
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  userButtonPopoverActionButton__manageAccount: 'hidden',
                },
              }}
            />
          </>
        ) : (
          <>
            <Link href="/top" className="relative">
              <Button variant="default" className="text-white font-semibold">
                <FaStar className="text-lg" />
              </Button>
              <code className="absolute -top-4 right-0 text-sm whitespace-nowrap left-0">
                Top 10
              </code>
            </Link>
            <div className="relative md:hidden">
              <CartToggle />
            </div>
            <Link href="/sign-in">
              <Button className="font-semibold text-white">Login</Button>
            </Link>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
