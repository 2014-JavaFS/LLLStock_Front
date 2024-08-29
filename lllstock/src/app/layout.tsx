"use client";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/ui/header";
import Footer from "../components/ui/footer";
import Contact from "./contact/page";
import Link from "next/link";
import { Toaster } from "sonner";
import { usePathname } from 'next/navigation';
import { AuthProvider } from "./context/authContext";


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
      <AuthProvider>
        <Header />
     
      
        <main>{children}</main>
        <Toaster />
        <Footer />
      </AuthProvider>
      
    </body>
  </html>
  );
}
