"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { StripeCheckout } from "@/components/payment/stripe-checkout"

export function PaymentDialog() {
  const [showCheckout, setShowCheckout] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[var(--brand-primary)] text-white rounded-pill hover:scale-105 hover:shadow-lg transition-transform duration-500 ease-out">
          Pay Securely
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Booking Summary</DialogTitle>
        </DialogHeader>
        <Card className="animate-in fade-in duration-700">
          <CardContent className="p-4 space-y-2">
            <p className="text-sm">Consultation: General Physician</p>
            <p className="text-sm">Amount: ₹199</p>
          </CardContent>
        </Card>

        {!showCheckout ? (
          <Button onClick={() => setShowCheckout(true)} className="bg-brand-gradient text-white rounded-pill">
            Proceed to Payment
          </Button>
        ) : (
          <StripeCheckout productId="gp-consult" />
        )}
      </DialogContent>
    </Dialog>
  )
}
