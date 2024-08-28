"use client";
import Image from "next/image";
import LSP from "./livestock/livestock_select_page";
import LTP from "./livestock/livestock_table_page";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import Register from "./register/page";
import Profile from "./edit_profile/page";
import Complete from "./complete_profile/page";
import Error from "./error/page";

export default function Home() {
  return (
    <main className="flex-grow">
      <Profile />
    </main>
  );
}
