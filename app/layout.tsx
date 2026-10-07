import type { Metadata, Viewport } from "next";
import "./globals.css";
import { body, display, mono } from "@/lib/fonts";
import { site } from "@/lib/site";
import { SoundProvider } from "@/components/SoundProvider";
import { Lamp } from "@/components/Lamp";
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · creative software studio`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: `${site.name} · ${site.tagline}`, description: site.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eceee6" },
    { media: "(prefers-color-scheme: dark)", color: "#101412" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <div id="top" />
        <a className="skip" href="#main">
          skip to content
        </a>
        <SoundProvider>
          <Loader />
          <Lamp />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </SoundProvider>
      </body>
    </html>
  );
}
