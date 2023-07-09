import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server';

export async function POST ( req ) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    let data = await req.json()

    let products = data.products

    const session = await stripe.checkout.sessions.create({
        line_items: products.map((product) => {
            return {
                price_data: {
                    currency: 'gbp',
                    product_data : {
                        name: product.product_id.name,
                        images: [product.product_id.img]
                    },
                    unit_amount: product.product_id.price * 100,
                },
                adjustable_quantity: {
                    enabled:true,
                    minimum: 1,
                },
                quantity: product.quantity
            }
            
        }),
        mode: 'payment',
        success_url: 'http://localhost:3000',
        cancel_url: 'http://localhost:3000'
    })
    return NextResponse.json(session.url)
}