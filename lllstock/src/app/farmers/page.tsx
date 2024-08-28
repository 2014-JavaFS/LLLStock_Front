"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FarmerCard from "./FarmerCard";
import React, { useState, useEffect } from "react";
import { lllServer } from "@/utils/lllServer";


interface FarmerInformation {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
}

const Farmers: React.FC = () => {
  const router = useRouter();
  const [farmers, setFarmers] = useState<FarmerInformation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await lllServer.get<FarmerInformation[]>('/users/farmers');
        setFarmers(response.data);
      } catch (error) {
        console.error("Error fetching farmers date: ", error);
        setError("Error fetching farmers data");
        router.push(`/error`);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (farmers.length === 0) {
    return <p>No farmers found</p>;
  }

  return (
    <>
    <p>This is the farmers page</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {farmers.map(farmer => (
          <FarmerCard key={farmer.userId} farmer={farmer}></FarmerCard>
        ))}
      </div>
    </>
  );
}

export default Farmers;