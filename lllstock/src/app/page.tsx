"use client";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import Error from "./error/error_page";
export default function Home() {


  return (
    <main>
      <Error />
    </main>
  );
}
