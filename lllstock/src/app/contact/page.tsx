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
  } from "@/components/ui/card"
export default function About() {

    const style1=cn("flex flex-col items-center justify-between",)

  return (
    <main className="flex min-h-[calc(100vh-4em)] flex-col items-center justify-between p-24">
      <p>This is the contact page</p>
      <Card>
        <CardTitle>This is our card</CardTitle>
        <CardContent>This is the content</CardContent>
      </Card>
      <Button className="bg-blue-700 text-lg" onClick={()=>toast("wow")}>WOW</Button>
    </main>
  );
}