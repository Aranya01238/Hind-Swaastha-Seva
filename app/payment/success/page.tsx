import Link from "next/link"

export default function PaymentSuccess() {
  return (
    <main className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Payment successful</h1>
      <p className="mt-2 text-muted-foreground">Your booking has been confirmed.</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Link href="/appointments" className="underline">
          Book another
        </Link>
        <Link href="/" className="underline">
          Go home
        </Link>
      </div>
    </main>
  )
}
