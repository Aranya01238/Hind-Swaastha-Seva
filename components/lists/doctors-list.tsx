"use client";

import { useMemo, useState } from "react";
import { useSheets } from "@/hooks/use-sheets";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Empty } from "@/components/empty-state";
import { useRouter, useSearchParams } from "next/navigation";
import DoctorCard from "@/components/doctor-card";

export default function DoctorsList() {
  const router = useRouter();
  const params = useSearchParams();
  const specialtyFilter = params.get("specialty") || "";

  const { data, error, isLoading } = useSheets<any[]>("Doctors", {
    tab: "Doctors",
  });
  const [q, setQ] = useState("");

  function mapDoctorRow(r: any) {
    const id = r?.doctor_id ?? r?.id ?? r?.DOCTOR_ID ?? "";
    const hospitalId = r?.hospital_id ?? r?.HOSPITAL_ID ?? "";
    const name = r?.name ?? r?.NAME ?? "";
    const specialization =
      r?.specialization ?? r?.SPECIALIZATION ?? r?.specialty ?? "";
    const rating = Number(r?.rating ?? r?.RATING ?? 0);
    const fee = Number(r?.fee ?? r?.FEE ?? 0);
    return {
      id,
      name,
      specialty: specialization,
      hospitalName: String(hospitalId || ""),
      rating,
      fee,
      // optional fields used by UI; keep undefined if not present
      experienceYears: r?.experienceYears,
      nextAvailable: r?.nextAvailable,
    };
  }

  const doctors = useMemo(() => {
    const rows = Array.isArray(data) ? data : [];
    return rows
      .filter((r) => r && typeof r === "object")
      .map(mapDoctorRow)
      .filter((d) =>
        specialtyFilter
          ? (d.specialty || "")
              .toLowerCase()
              .includes(specialtyFilter.toLowerCase())
          : true
      )
      .filter((d) =>
        q
          ? (d.name || "").toLowerCase().includes(q.toLowerCase()) ||
            (d.hospitalName || "").toLowerCase().includes(q.toLowerCase())
          : true
      );
  }, [data, specialtyFilter, q]);

  if (error)
    return (
      <div className="text-destructive" role="alert">
        Failed to load doctors: {String(error.message || error)}
      </div>
    );
  if (isLoading)
    return <div className="py-8 text-center">Loading doctors…</div>;
  if (!doctors.length)
    return (
      <Empty
        title="No doctors found"
        description="Try clearing filters or search."
      />
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search doctors or hospitals"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search doctors"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((d, idx) => (
          <Card key={`${d.id ?? `${d.name}-${d.hospitalName}`}-${idx}`}>
            <CardHeader>
              <CardTitle className="text-pretty">{d.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {d.specialty} • {d.hospitalName}
              </p>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-sm">
                <div>Rating: {Number.isFinite(d.rating) ? d.rating : 0}</div>
                <div>Fee: ₹{d.fee ?? 0}</div>
                {d.nextAvailable ? <div>Next: {d.nextAvailable}</div> : null}
              </div>
              <Button
                onClick={() => {
                  const pending = {
                    type: "hospital",
                    item: {
                      id: d.id || d.name || "doctor",
                      name: `${d.name} — ${d.hospitalName || ""}`.trim(),
                      price: Number(d.fee || 0),
                    },
                    date: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // +1h default
                    createdAt: Date.now(),
                  };
                  if (typeof window !== "undefined") {
                    sessionStorage.setItem(
                      "hss.pendingBooking",
                      JSON.stringify(pending)
                    );
                  }
                  const qs = new URLSearchParams({
                    service: "hospital",
                    item: pending.item.name,
                    price: String(pending.item.price),
                    date: pending.date,
                  });
                  router.push(`/pay?${qs.toString()}`);
                }}
              >
                Choose
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
