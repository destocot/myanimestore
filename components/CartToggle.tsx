import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { FaShoppingCart } from 'react-icons/fa'
import CartList from './CartList'
import Link from 'next/link'
import { auth } from '@clerk/nextjs'

export default async function SheetDemo() {
  const { userId }: { userId: string | null } = auth()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">
          <FaShoppingCart className="text-lg text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <h1>My Cart</h1>
          </SheetTitle>
        </SheetHeader>
        {userId && <CartList />}
        {userId && (
          <SheetFooter>
            <SheetClose asChild>
              <Link href="/checkout" className="w-full">
                <Button
                  type="button"
                  className="w-full py-6 text-white font-semibold"
                >
                  Checkout
                </Button>
              </Link>
            </SheetClose>
          </SheetFooter>
        )}
        {!userId && (
          <Link href="/sign-in" className="w-full">
            <Button
              type="button"
              className="mt-4 w-full py-6 text-white font-semibold"
            >
              Sign-In
            </Button>
          </Link>
        )}
      </SheetContent>
    </Sheet>
  )
}
