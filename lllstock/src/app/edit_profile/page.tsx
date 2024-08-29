"use client";
import { Button } from "@/components/ui/button";
import { lllServer } from "@/utils/lllServer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserProfile({ initialEmail = "", initialPassword = "" }) {
  const userId = JSON.parse(localStorage.getItem("userId"));
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
        body: JSON.stringify({userId, firstName, lastName, email, password })
      });

      const response = await lllServer.post("/users/info", res);
      router.push("/");

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
