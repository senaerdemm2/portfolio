import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sena Erdem - Junior Data Analyst & BI Analyst",
  description:
    "Computer Engineering graduate with 6 months of Data Analyst / BI internship experience at GLP Software. Specialised in SQL, Power BI, DAX, Python, and data analysis workflows. Open to Junior Data Analyst, BI Analyst, and Reporting Analyst roles in Poland and remote.",
  keywords: [
    "Junior Data Analyst",
    "BI Analyst",
    "Reporting Analyst",
    "Data Analyst",
    "Power BI",
    "DAX",
    "SQL",
    "PostgreSQL",
    "Python",
    "Pandas",
    "Power Automate",
    "Tableau",
    "Data Analytics",
    "EDA",
    "Sena Erdem",
    "Poland",
    "Krakow",
    "Warsaw",
  ],
  authors: [{ name: "Sena Erdem" }],
  openGraph: {
    title: "Sena Erdem - Junior Data Analyst & BI Analyst",
    description:
      "Computer Engineering graduate specialised in end-to-end data analysis workflows. SQL · Power BI · DAX · Python · Power Automate. Open to Junior Data Analyst, BI Analyst, and Reporting Analyst roles.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sena Erdem - Junior Data Analyst & BI Analyst",
    description:
      "Computer Engineering graduate specialised in end-to-end data analysis workflows. Open to Junior Data Analyst, BI Analyst, and Reporting Analyst roles.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
