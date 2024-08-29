"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function About() {
  const handleEmailSubmit = () => {
    window.location.href = `mailto:LLLSTOCK@mail.com`;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            If you have any questions or inquiries, feel free to reach out to us
            by email.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            className="bg-blue-700 text-white px-6 py-2 mt-4"
            onClick={handleEmailSubmit}
          >
            Send Email
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
