'use client'
import useCart from '@/hooks/useCart'
import { AnimeCardType } from '@/types/types'
import { Anime } from '@prisma/client'
import { FaTrash } from 'react-icons/fa'

const RemoveFromCartBtn = ({ anime }: { anime: AnimeCardType }) => {
  const cart = useCart()

  const clickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    anime: AnimeCardType
  ) => {
    e.preventDefault()
    cart?.removeItemFromCart(anime)
  }

  return (
    <button
      onClick={(e) => clickHandler(e, anime)}
      className="hover:scale-125 mb-1 transition-all"
    >
      <FaTrash />
    </button>
  )
}
export default RemoveFromCartBtn
