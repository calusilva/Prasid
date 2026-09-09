import { SectionThemer } from "@/components/layout/SectionThemer";
import { Hero } from "@/components/home/Hero";
import { SplitAreas } from "@/components/home/SplitAreas";
import { About } from "@/components/home/About";
import { ContactBlock } from "@/components/shared/ContactBlock";

export default function HomePage() {
  return (
    <SectionThemer section="home">
      <Hero />
      <SplitAreas />
      <About />
      <ContactBlock
        intro="Estamos em São Félix da Marinha, com atendimento comercial para as duas divisões. Contacte-nos por telefone ou email — respondemos no próprio dia útil."
      />
    </SectionThemer>
  );
}
