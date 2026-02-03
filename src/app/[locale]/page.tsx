"use client";

import { useState } from "react";
import { Zone01Sky, Zone02Skyline, Zone03MidLevels, Zone04Street, Zone05Ground } from "@/components/zones";
import { RSVPModal, FloatingRSVPButton } from "@/components/rsvp";

export default function Home() {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [hasRsvped, setHasRsvped] = useState(false);

  return (
    <main className="relative">
      <Zone01Sky />
      <Zone02Skyline />
      <Zone03MidLevels />
      <Zone04Street />
      <Zone05Ground 
        hasRsvped={hasRsvped} 
        onRsvpClick={() => setIsRsvpOpen(true)} 
      />

      <FloatingRSVPButton 
        onClick={() => setIsRsvpOpen(true)}
        hasRsvped={hasRsvped}
      />

      <RSVPModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        onComplete={() => setHasRsvped(true)}
      />
    </main>
  );
}
