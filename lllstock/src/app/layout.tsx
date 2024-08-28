"use client";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/ui/header.tsx";
import Footer from "../components/ui/footer";
import Contact from "./contact/page";
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
      <Header />
     
      
      <main>{children}</main>
      <Toaster />
      <Footer />
    </body>
  </html>
  );
}
