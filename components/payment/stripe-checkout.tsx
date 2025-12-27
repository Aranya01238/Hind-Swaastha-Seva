"use client"

import { useCallback } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { startCheckoutSession } from "@/app/actions/stripe"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

export function StripeCheckout({ productId }: { productId: string }) {
  const fetchClientSecret = useCallback(() => startCheckoutSession(productId), [productId])

  // Check if Stripe is configured
  if (!stripePromise || !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    return (
      <Card className="p-6 border-amber-200 bg-amber-50">
        <div className="flex items-center gap-3 text-amber-700">
          <AlertCircle size={20} />
          <div>
            <h3 className="font-semibold">Payment System Not Configured</h3>
            <p className="text-sm">Stripe payment integration is not set up. Configure Stripe to enable payments.</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div id="checkout" className="mt-3 rounded-lg border bg-background">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
