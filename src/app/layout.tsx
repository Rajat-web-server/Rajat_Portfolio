import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { BackgroundSwitcher } from "@/components/background/background-switcher";
import { siteConfig } from "@/data/site-config";
import { PetCursor } from "@/components/pet/pet-cursor";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundSwitcher />
          <Navbar />
          <PetCursor/>
          <main className="mx-auto max-w-4xl px-4 pb-20 pt-28">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
