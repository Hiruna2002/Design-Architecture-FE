import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://design-architecture.vercel.app"),
  title: { default: "Design Architecture | Architectural Designer Sri Lanka", template: "%s | Design Architecture" },
  description: "Modern architectural design, planning and project solutions in Sri Lanka. Explore our projects, services and design process.",
  keywords: ["architectural designer Sri Lanka", "architecture", "house design", "building design", "architectural projects"],
  openGraph: { type: "website", locale: "en_LK", siteName: "Design Architecture", title: "Design Architecture", description: "We design your vision into reality!", images: [{ url: "/images/bg.jpg", width: 1200, height: 630, alt: "Design Architecture" }] },
  twitter: { card: "summary_large_image", title: "Design Architecture", description: "We design your vision into reality!", images: ["/images/bg.jpg"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="en"><body>{children}</body></html>;
}
