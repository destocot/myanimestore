import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const signature = headers().get('stripe-signature') as string
  const webhookSecret = process.env.STRIPE_SIGNING_SECRET!
  const body = await req.text()

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.log(err)
  }
  if (event && event.type === 'checkout.session.completed') {
    const session = event.data.object
    let purchasedIds
    let userId
    if (session.metadata) {
      purchasedIds = JSON.parse(session.metadata.ids)
      userId = JSON.parse(session.metadata.userId)
      await prisma.user.update({
        where: { id: userId },
        data: {
          animes: {
            connect: purchasedIds,
          },
        },
      })
    }
  }

  return NextResponse.json({ mssg: 'END OF confirmation' }, { status: 200 })
}
