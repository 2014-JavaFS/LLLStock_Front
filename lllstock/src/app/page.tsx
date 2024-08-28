"use client";
import Image from "next/image";
import LSP from "./livestock_select/page";
import LTP from "./livestock_table/page";
import Link from "next/link";
import Register from "./register/page";
import Profile from "./user_profile/page";
import Error from "./error/page";
import Home from "./home/page"
export default function Page() {
  return (
    <main className="flex-grow">
      <Home />
    </main>
  );
}
