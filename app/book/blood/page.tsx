import BookingForm, { type BookingItem } from "@/components/booking/booking-form"

const items: BookingItem[] = [
  { id: "o-pos-1u", name: "O+ 1 Unit Reservation", price: 950 },
  { id: "a-neg-1u", name: "A- 1 Unit Reservation", price: 1150 },
]

export default function BookBloodPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <BookingForm
        type="blood"
        items={items}
        title="Reserve Blood Unit"
        description="Pay a refundable deposit to reserve a unit until pickup."
      />
    </main>
  )
}
