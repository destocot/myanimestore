import { getUserByClerkId } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { Anime } from '@prisma/client'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  const url = new URL(req.url)
  const cart = await req.json()

  const { id } = await getUserByClerkId()
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      email: true,
    },
  })

  const line_items = cart.map((item: Anime) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.title,
      },
      unit_amount: 0,
    },
    quantity: 1,
  }))

  const ids = cart.map((item: Anime) => ({
    id: item.id,
  }))

  try {
    const session = await stripe.checkout.sessions.create({
      // payment_method_types: ['card'],
      customer_email: user.email,
      line_items,
      mode: 'payment',
      metadata: {
        ids: JSON.stringify(ids),
        userId: JSON.stringify(id),
      },
      success_url: `${url.origin}/payment/success`,
      cancel_url: `${url.origin}/payment/cancelled`,
    })

    return NextResponse.json({ data: session.id }, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ mssg: 'END OF CATCH' }, { status: 500 })
  }
}
