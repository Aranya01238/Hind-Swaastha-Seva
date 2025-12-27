"use server"

import { stripe, isStripeConfigured } from "@/lib/stripe"
import { PRODUCTS } from "@/lib/products"

export async function startCheckoutSession(productId: string) {
  // Check if Stripe is configured
  if (!isStripeConfigured() || !stripe) {
    throw new Error("Stripe is not configured. Please add your Stripe credentials to environment variables.")
  }

  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: product.currency,
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInPaise,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  })

  return session.client_secret
}
