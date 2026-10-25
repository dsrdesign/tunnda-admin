import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { Providers } from "@/lib/providers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Dashboard privé : jamais indexé.
export const metadata: Metadata = {
  title: { default: "Tunnda Admin", template: "%s · Tunnda Admin" },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-fg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
