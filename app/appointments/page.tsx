import BookingForm, { type BookingItem } from "@/components/booking/booking-form"

const labItems: BookingItem[] = [
  { id: "cbc", name: "CBC Lab Test", price: 299 },
  { id: "lipid", name: "Lipid Profile", price: 799 },
  { id: "thyroid", name: "Thyroid Panel", price: 649 },
]

const bedItems: BookingItem[] = [
  { id: "general", name: "General Bed (24h)", price: 1200 },
  { id: "icu", name: "ICU Bed (12h)", price: 5500 },
]

const bloodItems: BookingItem[] = [
  { id: "o-pos-1u", name: "O+ 1 Unit Reservation", price: 950 },
  { id: "a-neg-1u", name: "A- 1 Unit Reservation", price: 1150 },
]

const hospitalItems: BookingItem[] = [
  { id: "cardio-consult", name: "Cardiology Consultation", price: 700 },
  { id: "ortho-consult", name: "Orthopedics Consultation", price: 650 },
  { id: "peds-consult", name: "Pediatrics Consultation", price: 500 },
]

export default function AppointmentsPage() {
  return (
    <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8">
      <h1 className="text-2xl font-semibold text-balance">Appointments & Bookings</h1>

      <section aria-labelledby="labs">
        <h2 id="labs" className="mb-3 text-lg font-medium">
          Lab Tests
        </h2>
        <BookingForm
          type="labs"
          items={labItems}
          title="Book a Lab Test"
          description="Choose a test and preferred time."
        />
      </section>

      <section aria-labelledby="beds">
        <h2 id="beds" className="mb-3 text-lg font-medium">
          Emergency Beds
        </h2>
        <BookingForm
          type="beds"
          items={bedItems}
          title="Reserve an Emergency Bed"
          description="Bed reservation with deposit."
        />
      </section>

      <section aria-labelledby="blood">
        <h2 id="blood" className="mb-3 text-lg font-medium">
          Blood Banks
        </h2>
        <BookingForm
          type="blood"
          items={bloodItems}
          title="Reserve Blood Unit"
          description="Reserve and pay a deposit for priority availability."
        />
      </section>

      <section aria-labelledby="hospital">
        <h2 id="hospital" className="mb-3 text-lg font-medium">
          Hospital Appointments
        </h2>
        <BookingForm
          type="hospital"
          items={hospitalItems}
          title="Book a Hospital Appointment"
          description="Select a specialty and slot."
        />
      </section>
    </main>
  )
}
