'use client'
import { AnimeCardType } from '@/types/types'
import { createContext, useEffect, useState } from 'react'

type CartContextType = {
  cart: AnimeCardType[]
  addItemToCart: (anime: AnimeCardType) => void
  removeItemFromCart: (anime: AnimeCardType) => void
  clearCart: () => void
}

export const Context = createContext<CartContextType | null>(null)

const Cart = ({ children }: { children: React.ReactNode }) => {
  const getInitialCart = () => {
    const saved = localStorage.getItem('mas-cart')

    if (saved !== null) {
      return JSON.parse(saved)
    }

    return []
  }
  const [cart, setCart] = useState<AnimeCardType[]>([])

  useEffect(() => {
    const initialCart = getInitialCart()
    if (initialCart && initialCart.length) {
      setCart(initialCart)
    }
  }, [])

  useEffect(() => {
    // write to local storage
    localStorage.setItem('mas-cart', JSON.stringify(cart))
  }, [cart])

  const addItemToCart = (anime: AnimeCardType) => {
    const item = cart.find((i) => i.id === anime.id)

    if (item) {
      // ITEM ALREADY IN CART
    } else {
      setCart([...cart, anime])
    }
  }

  const removeItemFromCart = (anime: AnimeCardType) => {
    const newCart = cart.filter((item) => item.id !== anime.id)
    setCart(newCart)
  }

  const clearCart = () => {
    setCart([])
  }

  const exposed = {
    addItemToCart,
    removeItemFromCart,
    cart,
    clearCart,
  }

  return <Context.Provider value={exposed}>{children}</Context.Provider>
}

export default Cart
