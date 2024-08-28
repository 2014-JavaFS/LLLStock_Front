"use client";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import axios from 'axios';
import { lllServer } from "@/utils/lllServer";
import Error from "../error/page";

export default function UserProfile({ initialEmail = "", initialPassword = "" }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await lllServer.get("/users/profile");
        const userData = response.data;

        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setPassword("•".repeat(userData.password.length)); // Obfuscate the password
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push(`/error?errorMessage=${error}`);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password })
      });

      const response = await lllServer.post("/users/info", res);
      router.push("/dashboard");

    } catch (e) {
      console.error('Error:', e);
      router.push('/error');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">First Name:</label>
            <input type="text" id="firstName" name="firstName" className="border rounded-md p-2 w-full"
              onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">Last Name:</label>
            <input type="text" id="lastName" name="lastName" className="border rounded-md p-2 w-full"
              onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input type="email" id="email" name="email" className="border rounded-md p-2 w-full"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input type="password" id="password" name="password" className="border rounded-md p-2 w-full"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full bg-blue-700 text-white text-lg p-2 rounded-md">Save Profile</Button>
        </form>
      </div>
    </div>
  );
}
