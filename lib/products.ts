export const PRODUCTS = [
  {
    id: "gp-consult",
    name: "General Physician Consultation",
    description: "One-time consultation fee",
    // Stripe amounts are in the smallest currency unit (paise)
    priceInPaise: 19900,
    currency: "inr" as const,
  },
]
