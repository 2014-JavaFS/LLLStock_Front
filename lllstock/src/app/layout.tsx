import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/ui/header";
import Footer from "../components/ui/footer";
import Link from "next/link";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LLLMD",
  description: "Project 2 of Group 2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
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
