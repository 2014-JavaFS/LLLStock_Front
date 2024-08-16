"use client";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FarmerCard from "./FarmerCard";


interface FarmerInformation {
  user: number;
  firstName: string;
  lastName: string;
  email: string;
}

const farmers: FarmerInformation[] = [
  { user: 1, firstName: "John", lastName: "Smith", email: "js@mail.com"},
  { user: 2, firstName: "Jane", lastName: "Doe", email: "jd@mail.com"},
  { user: 3, firstName: "Emily", lastName: "Dickinson", email: "emilyd@mail.com"},
  { user: 4, firstName: "John", lastName: "Smith", email: "js@mail.com"},
  { user: 5, firstName: "Jane", lastName: "Doe", email: "jd@mail.com"},
  { user: 6, firstName: "Emily", lastName: "Dickinson", email: "emilyd@mail.com"},
  { user: 7, firstName: "John", lastName: "Smith", email: "js@mail.com"},
  { user: 8, firstName: "Jane", lastName: "Doe", email: "jd@mail.com"},
  { user: 9, firstName: "Emily", lastName: "Dickinson", email: "emilyd@mail.com"},
  { user: 10, firstName: "John", lastName: "Smith", email: "js@mail.com"},
  { user: 11, firstName: "Jane", lastName: "Doe", email: "jd@mail.com"},
  { user: 12, firstName: "Emily", lastName: "Dickinson", email: "emilyd@mail.com"}
]
export default function Farmer() {

  return (
    // <main className="flex min-h-[calc(100vh-4em)] flex-col items-center justify-between p-24">
    // </main>
    <>
    <p>This is the farmers page</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {farmers.map(farmer => (
          <FarmerCard key={farmer.user} farmer={farmer}></FarmerCard>
        ))}
      </div>
    </>
  );
}