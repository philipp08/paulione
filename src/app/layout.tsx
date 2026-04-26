import type { Metadata } from "next";
import { Poppins, Tenor_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./content-block.css";
import "./footer.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800"],
});

const tenorSans = Tenor_Sans({
  variable: "--font-tenor",
  subsets: ["latin"],
  weight: ["400"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "PauliONE | Webdesign & Marketing",
  description:
    "PauliONE – Wir erstellen Designs und Websites, die nicht nur gut aussehen, sondern auch funktionieren.",
  keywords: ["Webdesign", "Marketing", "Webauftritt", "Logo", "Branding", "PauliONE"],
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${poppins.variable} ${tenorSans.variable} ${playfairDisplay.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
