import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { company, fullAddress } from "@/lib/company";

/** Serif institucional — títulos. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

/** Sans limpa — UI e dados técnicos. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prasidiberica.pt"),
  title: {
    default: `${company.shortName} — Químicos e Têxteis por grosso`,
    template: `%s · ${company.shortName}`,
  },
  description:
    "Comércio grossista de produtos químicos industriais, higiene e limpeza, e de tecidos e acessórios de decoração. São Félix da Marinha, V. N. de Gaia. Desde 1986.",
  keywords: [
    "químicos industriais",
    "produtos de higiene e limpeza",
    "tecidos por grosso",
    "acessórios de decoração",
    "cortinados",
    "Vila Nova de Gaia",
  ],
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: company.shortName,
    title: `${company.shortName} — Químicos e Têxteis`,
    description:
      "Duas divisões complementares: químicos e têxteis por grosso desde 1986.",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.legalName,
    alternateName: company.shortName,
    foundingDate: String(company.founded),
    telephone: company.phone.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.locality,
      addressRegion: company.address.municipality,
      addressCountry: "PT",
    },
    description: fullAddress,
  };

  return (
    <html
      lang="pt-PT"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--ink)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
