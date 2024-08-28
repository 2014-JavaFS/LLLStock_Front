"use client";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/ui/header";
import Footer from "../components/ui/footer";
import Link from "next/link";
import { Toaster } from "sonner";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showHeader = pathname !== "/register";

  return (
    <html lang="en">
      <body className={inter.className}>
        {showHeader && <Header />}
        <nav className="h-8 bg-red-500">
          <Link href={"/contact"}>about me</Link>
          <Link href={"/register"}>register</Link>
          <Link href={"/farmers"}>farmers</Link>
        </nav>
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
