import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/content/site";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProjectViewerProvider } from "@/components/ProjectViewer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Portfolio`,
    template: `%s — ${site.name}`,
  },
  description:
    "Portfolio of Samarth Narahari Mandagere — AI/ML + product-minded frontend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ProjectViewerProvider>
            <CustomCursor />
            <ThemeToggle />
            <RevealOnScroll />
            <SmoothScroll>{children}</SmoothScroll>
          </ProjectViewerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
