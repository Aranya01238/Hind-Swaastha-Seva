"use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useLanguage } from "@/components/i18n/language-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  Globe, 
  Mail, 
  ListPlus, 
  CheckCircle2,
  Stethoscope,
  BriefcaseMedical
} from "lucide-react"

export default function ListCentrePage() {
  const { t } = useLanguage()
  const [name, setName] = useState("")
  const [type, setType] = useState<"hospital" | "clinic" | "diagnostic" | "pharmacy" | "blood-bank" | "other">("hospital")
  const [address, setAddress] = useState("")
  const [state, setState] = useState("")
  const [district, setDistrict] = useState("")
  const [contact, setContact] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [services, setServices] = useState<Record<string, boolean>>({
    emergency: false,
    icu: false,
    surgery: false,
    pathology: false,
    imaging: false,
    ambulance: false,
  })
  const [hours, setHours] = useState({ open: "", close: "", twentyFour: true })
  const [lat, setLat] = useState<string>("")
  const [lng, setLng] = useState<string>("")
  const [note, setNote] = useState("")

  const submit = () => {
    // In a real app, you would send this data to your backend
    alert(t("list_thanks") ?? "Thanks! We will verify and list your centre shortly.")
  }

  return (
    <main className="flex flex-col min-h-screen bg-gray-50/50">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-6 bg-white border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f9731612_1px,transparent_1px),linear-gradient(to_bottom,#f9731612_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-orange-50/60 rounded-full blur-3xl -z-10 pointer-events-none translate-x-1/4 -translate-y-1/4" />

        <div className="mx-auto max-w-4xl space-y-6 text-center md:text-left">
           {/* Badge */}
           <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-700/10 animate-fade-in-up">
             <BriefcaseMedical className="w-3.5 h-3.5" />
             Partner Network Program
           </div>
           
           <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 animate-fade-in-up">
                List your <span className="text-orange-600 relative inline-block">
                  Medical Centre
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange-600 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-lg text-muted-foreground text-balance max-w-2xl animate-fade-in-up-1 md:mx-0 mx-auto">
                Join our network of trusted healthcare providers. Reach more patients and help us build a connected healthcare ecosystem.
              </p>
           </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="p-6 md:p-10 animate-fade-in-up-2">
        <Card className="max-w-4xl mx-auto border-orange-100 shadow-xl shadow-orange-500/5">
          <CardHeader className="bg-orange-50/30 border-b border-orange-100/50 pb-6">
            <div className="flex items-center gap-2 text-orange-600 mb-2">
              <ListPlus className="size-5" />
              <span className="font-semibold text-sm uppercase tracking-wider">Registration Form</span>
            </div>
            <CardTitle className="text-2xl">Centre Details</CardTitle>
            <CardDescription>
              Please provide accurate details. All submissions are verified before listing.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8 space-y-8">
            
            {/* 1. Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 border-b pb-2">
                <Building2 className="size-4" /> Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Centre Type</Label>
                  <Select value={type} onValueChange={(v) => setType(v as any)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hospital">Hospital</SelectItem>
                      <SelectItem value="clinic">Clinic</SelectItem>
                      <SelectItem value="diagnostic">Diagnostic / Lab</SelectItem>
                      <SelectItem value="pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="blood-bank">Blood Bank</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Centre Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Sunrise Diagnostics" className="bg-white" />
                </div>
              </div>
            </div>

            {/* 2. Contact & Digital */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 border-b pb-2">
                <Phone className="size-4" /> Contact Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                    <Input className="pl-9 bg-white" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="+91..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                    <Input className="pl-9 bg-white" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contact@domain.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Website (Optional)</Label>
                  <div className="relative">
                    <Globe className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                    <Input className="pl-9 bg-white" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://..." />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Location */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 border-b pb-2">
                <MapPin className="size-4" /> Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label>Full Address</Label>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, Building, Area" className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label>District</Label>
                  <Input value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="District Name" className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input value={state} onChange={(e) => setState(e.target.value)} placeholder="State Name" className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label>Latitude (Optional)</Label>
                  <Input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="e.g., 19.0760" className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label>Longitude (Optional)</Label>
                  <Input value={lng} onChange={(e) => setLng(e.target.value)} placeholder="e.g., 72.8777" className="bg-white" />
                </div>
              </div>
            </div>

            {/* 4. Operations & Services */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 border-b pb-2">
                <Clock className="size-4" /> Operations & Services
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Services */}
                <div className="space-y-3">
                  <Label className="text-base">Available Facilities</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      ["emergency", "Emergency (Casualty)"],
                      ["icu", "ICU / Critical Care"],
                      ["surgery", "Surgery / Operation Theatre"],
                      ["pathology", "Pathology / Diagnostics Lab"],
                      ["imaging", "Imaging (X-Ray / MRI / CT)"],
                      ["ambulance", "Ambulance Service"],
                    ].map(([key, label]) => (
                      <div key={key} className="flex items-center space-x-2 border p-2 rounded-lg bg-white hover:bg-slate-50 transition-colors">
                        <Checkbox
                          id={key}
                          checked={services[key]}
                          onCheckedChange={(v) => setServices((s) => ({ ...s, [key]: Boolean(v) }))}
                        />
                        <label
                          htmlFor={key}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timings */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border p-3 rounded-lg bg-white">
                    <div className="space-y-0.5">
                      <Label className="text-base">24x7 Operations</Label>
                      <p className="text-xs text-muted-foreground">Is this centre open 24 hours?</p>
                    </div>
                    <Switch
                      checked={hours.twentyFour}
                      onCheckedChange={(v) => setHours((h) => ({ ...h, twentyFour: v }))}
                    />
                  </div>

                  {!hours.twentyFour && (
                    <div className="grid grid-cols-2 gap-3 animate-fade-in-up">
                      <div className="space-y-2">
                        <Label>Opens At</Label>
                        <Input
                          type="time"
                          value={hours.open}
                          onChange={(e) => setHours((h) => ({ ...h, open: e.target.value }))}
                          className="bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Closes At</Label>
                        <Input
                          type="time"
                          value={hours.close}
                          onChange={(e) => setHours((h) => ({ ...h, close: e.target.value }))}
                          className="bg-white"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2 pt-2">
                    <Label>Additional Notes</Label>
                    <Textarea
                      placeholder={t("centre_notes") ?? "Specialists availability, accreditation details, etc."}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="min-h-[100px] bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={submit}
              size="lg"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/20 text-lg py-6"
            >
              <CheckCircle2 className="mr-2 size-5" />
              {t("submit_cta") ?? "Submit Application"}
            </Button>

          </CardContent>
        </Card>
      </section>
    </main>
  )
}
