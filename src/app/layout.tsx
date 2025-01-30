import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Provider from "@/components/Provider";
import type { Metadata } from "next";
import { getServerSession, Session } from "next-auth";
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
  title: "ChipFlow",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await getServerSession(authOptions)) as Session | null;
  return (
    <html lang="en">
      <Provider session={session}>
        <body
          className={`bg-radial-gradient min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </Provider>
    </html>
  );
}
