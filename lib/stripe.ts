import Stripe from "stripe"

// Initialize Stripe only if the secret key is available
export const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-12-18.acacia",
    })
    : null

// Check if Stripe is configured
export const isStripeConfigured = () => {
    return !!(process.env.STRIPE_SECRET_KEY && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
}