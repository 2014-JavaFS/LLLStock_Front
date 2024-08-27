"use client";
import Image from "next/image";
import LSP from "./livestock/livestock_select_page";
import LTP from "./livestock/livestock_table_page";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import Register from "./register/register_page";
import Profile from "./user_profile/user_profile_page";
import Error from "./error/error_page";
export default function Home() {
  return (
    <main className="flex-grow">
      <Register />
    </main>
  );
}
