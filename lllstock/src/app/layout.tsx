import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./custom-components/header";
import Footer from "./custom-components/footer";

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
        {children}
        <Footer />
        </body>
    </html>
  );
}
