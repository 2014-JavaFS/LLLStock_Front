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
import Farmer from "./[id]";
import React, { useState, useEffect } from "react";
import axios from "axios";


interface FarmerInformation {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
}

// const farmers: FarmerInformation[] = [
//   { userId: 1, firstName: "John", lastName: "Smith", email: "js@mail.com"},
//   { userId: 2, firstName: "Jane", lastName: "Doe", email: "jd@mail.com"},
//   { userId: 3, firstName: "Emily", lastName: "Dickinson", email: "emilyd@mail.com"},
//   { userId: 4, firstName: "John", lastName: "Smith", email: "js@mail.com"},
//   { userId: 5, firstName: "Jane", lastName: "Doe", email: "jd@mail.com"},
//   { userId: 6, firstName: "Emily", lastName: "Dickinson", email: "emilyd@mail.com"},
//   { userId: 7, firstName: "John", lastName: "Smith", email: "js@mail.com"},
//   { userId: 8, firstName: "Jane", lastName: "Doe", email: "jd@mail.com"},
//   { userId: 9, firstName: "Emily", lastName: "Dickinson", email: "emilyd@mail.com"},
//   { userId: 10, firstName: "John", lastName: "Smith", email: "js@mail.com"},
//   { userId: 11, firstName: "Jane", lastName: "Doe", email: "jd@mail.com"},
//   { userId: 12, firstName: "Emily", lastName: "Dickinson", email: "emilyd@mail.com"}
// ]
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
    // <main className="flex min-h-[calc(100vh-4em)] flex-col items-center justify-between p-24">
    // </main>
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