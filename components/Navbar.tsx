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
      <Link
        href="/"
        className="flex mx-auto md:mx-0 gap-5 items-center"
        aria-label="MyAnimeStore"
      >
        <h1 className="text-5xl sm:text-4xl">MyAnimeStore</h1>
        <FaStore className="text-5xl" />
      </Link>
      <ul className="flex mt-4 items-center mx-auto md:mx-0 gap-4">
        {!!userId ? (
          <>
            <li>
              <Link href="/" aria-label="home">
                <Button variant="secondary" aria-label="home btn">
                  <FaHome className="text-xl" />
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/profile" aria-label="profile">
                <Button
                  variant="default"
                  className="text-white font-semibold"
                  aria-label="profile btn"
                >
                  <FaUser className="text-lg" />
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/top" aria-label="top 10 anime">
                <Button
                  variant="default"
                  className="text-white font-semibold"
                  aria-label="top 10 anime btn"
                >
                  <FaStar className="text-lg" />
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/ai" className="relative" aria-label="Try AI">
                <Button
                  aria-label="Try AI btn"
                  variant="destructive"
                  className="text-white font-semibold"
                >
                  <FaMicrochip className="text-lg" />
                </Button>
                <code className="absolute -top-8 right-0 text-sm whitespace-nowrap left-0 animate-bounce">
                  Try AI
                </code>
              </Link>
            </li>
            <li>
              <div className="relative md:hidden">
                <CartToggle />
              </div>
            </li>
            <li>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonPopoverActionButton__manageAccount: 'hidden',
                  },
                }}
              />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/top" aria-label="top 10 anime">
                <Button
                  variant="default"
                  className="text-white font-semibold"
                  aria-label="top 10 anime btn"
                >
                  <FaStar className="text-lg" />
                </Button>
              </Link>
            </li>
            <li>
              <div className="relative md:hidden">
                <CartToggle />
              </div>
            </li>
            <li>
              <Link href="/sign-in" aria-label="sign-in">
                <Button
                  className="font-semibold text-white"
                  aria-label="sign-in btn"
                >
                  Login
                </Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
