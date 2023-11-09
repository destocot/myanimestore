'use client'
import Redirector from '@/components/Redirector'
import useCart from '@/hooks/useCart'
import { useEffect } from 'react'

const SuccessPage = () => {
  const cart = useCart()

  useEffect(() => {
    cart?.clearCart()
  }, [])

  return (
    <main>
      <h2>Successful Payment</h2>
      <div className="flex items-center gap-4">
        <Redirector />
        <div>
          <p>checkout your profile to see your current collection</p>
          <p>redirecting to home page...</p>
        </div>
      </div>
    </main>
  )
}
export default SuccessPage
