import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Menu } from "@/components/menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section className="flex flex-col min-h-screen bg-white dark:bg-zinc-900">
          <Menu />
          <main className="flex">{children}</main>
        </section>
      </body>
    </html>
  );
}
