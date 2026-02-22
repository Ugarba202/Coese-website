import type { Metadata, Viewport } from "next";
import { Exo_2, JetBrains_Mono, Nunito } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/constants";

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "COESA — ABU Zaria",
    template: "%s | COESA ABU Zaria",
  },
  description:
    "Official website of the Computer Engineering Student Association, Ahmadu Bello University, Zaria.",
  openGraph: {
    images: ["/og-image.png"],
    type: "website",
    title: "COESA — ABU Zaria",
    description:
      "Computer Engineering Student Association, ABU Zaria. Engineering the Future, One Line at a Time.",
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#0A5FA8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${exo2.variable} ${jetbrainsMono.variable} ${nunito.variable}`}
    >
      <body className="font-body antialiased bg-coesa-midnight text-white overflow-x-hidden">
        {/* Skip to content accessibility link */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>

        <Navbar />

        <main id="main-content">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
