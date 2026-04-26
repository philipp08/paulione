import { AnfrageForm } from "@/components/landing/AnfrageForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projekt anfragen | PauliONE",
  description: "Starten Sie jetzt Ihr Webdesign oder Marketing Projekt mit PauliONE.",
  robots: "noindex, follow", // Often request forms shouldn't be indexed, but up to you.
};

export default function AnfragePage() {
  return <AnfrageForm />;
}
