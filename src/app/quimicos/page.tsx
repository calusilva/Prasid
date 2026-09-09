import type { Metadata } from "next";
import { SectionThemer } from "@/components/layout/SectionThemer";
import { QuimicosHero } from "@/components/quimicos/QuimicosHero";
import { CategoryGrid } from "@/components/quimicos/CategoryGrid";
import { SectorsList } from "@/components/quimicos/SectorsList";
import { CommercialCTA } from "@/components/quimicos/CommercialCTA";
import { ContactBlock } from "@/components/shared/ContactBlock";

export const metadata: Metadata = {
  title: "Químicos",
  description:
    "Comércio por grosso de produtos químicos industriais, auxiliares têxteis, produtos de higiene e limpeza profissional. Indústria, hotelaria e limpeza profissional.",
  alternates: { canonical: "/quimicos" },
};

export default function QuimicosPage() {
  return (
    <SectionThemer section="quimicos">
      <QuimicosHero />
      <CategoryGrid />
      <SectorsList />
      <CommercialCTA />
      <ContactBlock
        kicker="Divisão Químicos"
        title="Falar com a área comercial"
        intro="Atendimento técnico-comercial para químicos industriais, higiene e limpeza."
      />
    </SectionThemer>
  );
}
