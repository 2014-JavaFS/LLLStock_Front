"use client";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import Register from "./register/register_page";
import Profile from "./user_profile/user_profile_page";

export default function Home() {


  return (
    <main>
      <Register />
    </main>
  );
}
