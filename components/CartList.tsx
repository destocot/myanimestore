'use client'
import useCart from '@/hooks/useCart'
import Image from 'next/image'
import RemoveFromCartBtn from './RemoveFromCartBtn'

const CartList = () => {
  const cart = useCart()
  return (
    <div className="flex flex-col mt-4">
      {cart &&
        cart?.cart.map((anime) => (
          <div
            key={anime.id}
            className="flex justify-between items-end border-b border-[#efefef] mb-1 hover:bg-white/10 hover:cursor-pointer transition-all"
          >
            <Image
              src={anime.main_picture}
              alt="anime image"
              width={400}
              height={600}
              className="object-cover w-12 h-auto aspect-[2/3]"
            />
            <div className="flex items-end gap-2">
              <p className="text-sm text-right">{anime.title}</p>
              <RemoveFromCartBtn anime={anime} />
            </div>
          </div>
        ))}
    </div>
  )
}
export default CartList
