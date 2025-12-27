"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSheets } from "@/hooks/use-sheets";
import { mapDoctor } from "@/lib/data-mapper";

export default function BookHospitalPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const preselected = sp?.get("hospital_id") || ""; // Added optional chaining here

  const {
    data: doctorsData,
    error: doctorsError,
    isLoading: doctorsLoading,
  } = useSheets<any[]>("Doctors", { tab: "Doctors" });
  const {
    data: hospitalsData,
    error: hospitalsError,
    isLoading: hospitalsLoading,
  } = useSheets<any[]>("Hospitals", { tab: "Hospitals" }); // This looks correct

  const [selectedHospital, setSelectedHospital] = useState<string>(preselected);

  // Filter doctors based on selected hospital
  const filteredDoctors = useMemo(() => {
    if (!Array.isArray(doctorsData) || !selectedHospital) return [];
    return doctorsData
      .map(mapDoctor)
      .filter((d) => d.hospital_id === selectedHospital);
  }, [doctorsData, selectedHospital]);

  function onContinue() {
    if (!selectedHospital) return;
    router.push(`/doctors?hospital_id=${encodeURIComponent(selectedHospital)}`);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Select a Hospital</CardTitle>
          <CardDescription>
            We’ll show you doctors available in this hospital next.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {hospitalsError ? (
            <p className="text-sm text-destructive">
              Failed to load hospitals.
            </p>
          ) : null}
          {hospitalsLoading ? (
            <p className="text-sm text-muted-foreground">Loading hospitals…</p>
          ) : null}

          <RadioGroup
            value={selectedHospital}
            onValueChange={setSelectedHospital}
            className="grid gap-3"
            aria-label="Hospital selection"
          >
            {Array.isArray(hospitalsData) &&
              hospitalsData.map((h) => (
                <div
                  key={h.hospital_id}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <RadioGroupItem
                    value={h.hospital_id}
                    id={`h-${h.hospital_id}`}
                  />
                  <Label
                    htmlFor={`h-${h.hospital_id}`}
                    className="cursor-pointer"
                  >
                    {h.name} ({h.available_beds} beds available)
                  </Label>
                </div>
              ))}
          </RadioGroup>

          <div className="flex justify-end">
            <button
              className="inline-flex h-9 items-center justify-center rounded-pill bg-[var(--brand-primary)] px-4 text-sm font-medium text-white hover:bg-[var(--brand-accent)]"
              onClick={onContinue}
              aria-label="Continue to doctors"
              disabled={!selectedHospital}
            >
              {selectedHospital ? "Find Doctors" : "Select a hospital"}
            </button>
          </div>

          {selectedHospital && (
            <div className="mt-6">
              <h3 className="text-lg font-medium">Doctors in this hospital:</h3>
              {filteredDoctors.length ? (
                filteredDoctors.map((d) => (
                  <p key={d.id}>
                    {d.name} - {d.specialty} - ₹{d.fee}
                  </p>
                ))
              ) : (
                <p>No doctors found for this hospital.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
