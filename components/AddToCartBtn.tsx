'use client'
import useCart from '@/hooks/useCart'
import { Anime } from '@prisma/client'
import { FaCartPlus } from 'react-icons/fa'
import { useAuth } from '@clerk/nextjs'
import { useToast } from './ui/use-toast'
import { ToastAction } from './ui/toast'
import Link from 'next/link'
import { AnimeCardType } from '@/types/types'

const AddToCartBtn = ({ anime }: { anime: AnimeCardType }) => {
  const cart = useCart()
  const { userId } = useAuth()
  const { toast } = useToast()

  const clickHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    anime: AnimeCardType
  ) => {
    e.preventDefault()

    if (!userId) {
      return toast({
        title: 'Must be logged in to add to cart!',
        action: (
          <Link href="/sign-in">
            <ToastAction altText="sign-in">Sign-In</ToastAction>
          </Link>
        ),
      })
    }
    cart?.addItemToCart(anime)
  }

  return (
    <button
      onClick={(e) => clickHandler(e, anime)}
      className="hover:scale-125 text-3xl transition-all"
    >
      <FaCartPlus />
    </button>
  )
}
export default AddToCartBtn
