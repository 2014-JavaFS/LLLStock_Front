"use client";
import { useParams, useRouter } from "next/navigation";
import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { lllServer } from "@/utils/lllServer";
import type { Farmer } from "@/app/types/farmer";
import type { CattleRecord } from "@/app/types/cattle";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Cattle: NextPage = () => {
    const params = useParams();
    const userId = params.userId;
    const router = useRouter();
    const [farmer, setFarmer] = useState<Farmer | null>(null);
    const [cattleRecords, setCattleRecords] = useState<CattleRecord[]>([]);
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
                const response = await lllServer.get<Farmer>(`/users/${userId}`,{
                    headers:{
                        'userId': userId.toString()
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
        
        const fetchCattleRecords = async () => {
            if(!userId || Array.isArray(userId)) {
                setError("Invalid user id");
                setLoading(false);
                return;
            }

            try {
                const response = await lllServer.get<CattleRecord[]>(`/medicalRecord/user`,{
                    headers:{
                        'userType': 'VET'
                    },
                    params: {
                        'userId': userId.toString()
                    }
                });
                setCattleRecords(response.data);
            } catch (error) {
                console.error("Error fetching cattle record data: ", error);
                setError("Error fetching cattle record data");
                router.push(`/error?errorMessage=${error}`);
            } finally {
                setLoading(false);
            }
        };

    
        fetchCattleRecords();
    }, [router, userId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // if (!farmer) {
    //     return <p>Farmer not found</p>;
    // }

    return (
        <>
            <h1>Cattle Record Information</h1>
            {cattleRecords.map(cattleRecord => (
                <Card key={cattleRecord.entryId} className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
                    <CardTitle className="text-xl font-semibold mb-2">
                        Entry Id: {cattleRecord.entryId}
                    </CardTitle>
                    <CardContent className="text-gray-700 mb-4">
                        <p>Breed: {cattleRecord.patientIdentification.breed}</p>
                        <p>Age: {cattleRecord.patientIdentification.age}</p>
                    </CardContent>
                    <div className="flex space-x-4">
                        <Link href={`/farmers/${userId}/cattle/${cattleRecord.entryId}`} passHref>
                            <Button className="mr-4">View Cattle Information</Button>
                        </Link>
                    </div> 
                    </Card>
            ))}
            <Link href={`/farmers/${userId}/cattle/new-cattle`} passHref>
                <Button className="mr-4">Add Livestock Information</Button>
            </Link>
        </>
    );
}
export default Cattle;