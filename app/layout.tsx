import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maison Haute Lumière — Extraits de parfum",
  description: "Extraits de parfum Maison Haute Lumière Paris. Livraison Nanterre, 92 et alentours. Expédition par colis.",
  themeColor: "#070606"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}