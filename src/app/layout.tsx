import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sena Erdem | Junior Data Analyst",
  description:
    "Data Analyst portfolio of Sena Erdem — specializing in Python, SQL, Power BI, and turning raw data into actionable business insights. Based in Warsaw, Poland.",
  keywords: [
    "Sena Erdem",
    "Data Analyst",
    "Junior Data Analyst",
    "Python",
    "SQL",
    "Power BI",
    "Data Analytics",
    "Portfolio",
    "Business Intelligence",
    "Warsaw",
  ],
  authors: [{ name: "Sena Erdem" }],
  openGraph: {
    title: "Sena Erdem | Junior Data Analyst",
    description:
      "Data Analyst portfolio — Python, SQL, Power BI. Turning raw data into actionable business insights.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
