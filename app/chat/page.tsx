import { SiteHeader } from "@/components/site-header"
import { NurseMaya } from "@/components/chat/nurse-maya"

export default function ChatPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <SiteHeader />
      <section className="p-6 space-y-4">
        <NurseMaya />
      </section>
    </main>
  )
}
