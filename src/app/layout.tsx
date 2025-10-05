// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import NavUser from "@/components/nav-user";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlogPropp — Demo Blog",
  description: "A small demo blog built with Next.js, Prisma, Tailwind and Better Auth",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-2 flex flex-col min-h-screen`}
      >
        {/* Navbar */}
        <nav className="bg-[#083d77] p-2 rounded-lg mb-4 flex flex-col sticky top-0 z-50 justify-between items-center sm:flex-row">
          <h1 className="text-3xl font-bold p-4 text-[#f4d35e]">BlogPropP</h1>
          <ul className="flex gap-6 flex-wrap justify-center sm:justify-start">
            <li>
              <Link className="text-[#ee964b] text-2xl" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="text-[#ee964b] text-2xl" href="/about/contact">
                Contact us
              </Link>
            </li>
            <li>
              <Link className="text-[#ee964b] text-2xl" href="/blog">
                Blogs
              </Link>
            </li>
            <NavUser isAuthenticated={!!session} />
          </ul>
        </nav>

        {/* Main content */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <footer className="bg-[#083d77] p-4 rounded-lg mt-4 text-center text-[#f4d35e]">
          <p className="text-lg">
            © {new Date().getFullYear()} Josefine Eriksson — Kod och Design
          </p>
        </footer>
      </body>
    </html>
  );
}
