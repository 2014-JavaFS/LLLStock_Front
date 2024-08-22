"use client";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import Register from "./register/register_page";

export default function Home() {


  return (
    <main className="flex min-h-[calc(100vh-4em)] flex-col items-center justify-between p-24">
      <Register />
    </main>
  );
}
