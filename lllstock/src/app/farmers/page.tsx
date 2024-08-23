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

import React, { useState, useEffect } from "react";
import axios from "axios";


interface FarmerInformation {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
}

const Farmers: React.FC = () => {

  const [farmers, setFarmers] = useState<FarmerInformation[]>([]);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get<FarmerInformation[]>('http://localhost:8080/users/farmers');
        setFarmers(response.data);
      } catch (error) {
        console.error("Error fetching farmers date: ", error);
      }
    };

    fetchFarmers();
  }, []);

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