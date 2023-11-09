'use client'
import { loadStripe } from '@stripe/stripe-js'
import useCart from '@/hooks/useCart'
import { Button } from '@/components/ui/button'
import CartList from '@/components/CartList'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

const CheckoutPage = () => {
  const cart = useCart()

  if (!cart || cart.cart.length === 0) {
    return (
      <main className="flex justify-center items-center h-[50vh]">
        <p className="text-center">cart is empty</p>
      </main>
    )
  }

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        body: JSON.stringify(cart.cart),
      })

      const { data: sessionId } = await res.json()

      await stripe?.redirectToCheckout({
        sessionId,
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main>
      <div className="w-11/12 mx-auto">
        <h1 className="border-b-2 pb-2">My Cart</h1>
        <CartList />
        <Button
          onClick={handleCheckout}
          type="button"
          className="w-full py-6 text-white font-semibold"
        >
          Purchase
        </Button>
      </div>
    </main>
  )
}
export default CheckoutPage
