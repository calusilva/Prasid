import type { Metadata } from "next";
import { SectionThemer } from "@/components/layout/SectionThemer";
import { TexteisHero } from "@/components/texteis/TexteisHero";
import { TexteisIntro } from "@/components/texteis/TexteisIntro";
import { FabricGrid } from "@/components/texteis/FabricGrid";
import { CalhaConfigurator } from "@/components/texteis/configurator/CalhaConfigurator";
import { ContactBlock } from "@/components/shared/ContactBlock";

export const metadata: Metadata = {
  title: "Têxteis",
  description:
    "Comércio de tecidos e acessórios de decoração: cortinados, voil, blackout, calhas e ferragens. Configurador de calhas com estimativa de preço em tempo real.",
  alternates: { canonical: "/texteis" },
};

export default function TexteisPage() {
  return (
    <SectionThemer section="texteis">
      <TexteisHero />
      <TexteisIntro />
      <FabricGrid />
      <CalhaConfigurator />
      <ContactBlock
        kicker="Divisão Têxteis"
        title="Falar sobre o seu projeto"
        intro="Amostras, medições e propostas de cortinado à medida."
      />
    </SectionThemer>
  );
}
