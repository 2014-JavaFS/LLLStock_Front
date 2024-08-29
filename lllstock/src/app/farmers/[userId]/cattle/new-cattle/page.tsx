"use client";
import { useParams, useRouter } from "next/navigation";
import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { lllServer } from "@/utils/lllServer";
import type { Farmer } from "@/app/types/farmer";
import NewCattle from "./NewCattle";

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
                        'userType': 'VET'
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
            <h1>Farmer Information</h1>
            <p>First Name: {farmer.firstName}</p>
            <p>Last Name: {farmer.lastName}</p>
            <p>Email: {farmer.email}</p>
            <NewCattle farmer={farmer}></NewCattle>
        </>
    );
}
export default Farmer;
