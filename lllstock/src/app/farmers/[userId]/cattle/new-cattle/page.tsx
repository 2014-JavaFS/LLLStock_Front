"use client";
import { useParams, useRouter } from "next/navigation";
import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { lllServer } from "@/utils/lllServer";
import type { Farmer } from "@/app/types/farmer";
import NewCattle from "./NewCattle";
import { Button } from "@/components/ui/button";

const Farmer: NextPage = () => {
    const params = useParams();
    const userId = params.userId;
    const router = useRouter();
    const [farmer, setFarmer] = useState<Farmer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFarmer = async () => {
            if(!userId || Array.isArray(userId)) {
                setError("Invalid user id");
                setLoading(false);
                return;
            }

            try {
                const response = await lllServer.get<Farmer>(`/users/farmers/${userId}`,{
                    headers:{
                        'userType': 'VET',
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
                setFarmer(response.data);
            } catch (error) {
                console.error("Error fetching farmer data: ", error);
                setError("Error fetching farmer data");
                router.push(`/error?errorMessage=${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchFarmer();
    }, [router, userId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!farmer) {
        return <p>Farmer not found</p>;
    }

    return (

        <>
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-center text-2xl font-bold mb-4">Insert Livestock</h1>
                <br/>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="block text-gray-700">
                        First Name:
                    </dt>
                    <label className="block text-gray-700 sm:col-span-2 sm:mt-0">
                        {farmer.firstName}
                    </label>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="block text-gray-700">
                        Last Name:
                    </dt>
                    <label className="block text-gray-700 sm:col-span-2 sm:mt-0">
                        {farmer.lastName}
                    </label>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="block text-gray-700">
                        Email:
                    </dt>
                    <label className="block text-gray-700 sm:col-span-2 sm:mt-0">
                        {farmer.email}
                    </label>
                </div>
                <br/>
                <hr/>
                <br/>
                <NewCattle farmer={farmer}></NewCattle>
            </div>
        </div>
        </>
    );
}
export default Farmer;
