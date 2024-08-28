"use client";

import React, { useState, useEffect } from 'react';
import Selection_Card from "../../components/ui/selection_card";
import { Cattle } from '../types/cattle';
import type { Farmer } from '../types/farmer';
import { useParams, useRouter } from "next/navigation";
import { NextPage } from "next";
import { lllServer } from "@/utils/lllServer";

const Livestock_Single_View_Page: React.FC<{ cattle: Cattle }> = ({ cattle }) => {
    const [cattleData, setCattleData] = useState<Cattle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const id = 25;

    useEffect(() => {
        const fetchCattleData = async () => {
            try {
                const response = await lllServer.get(`/medicalRecord/animal`, {
                    params: { animalId: id }
                });
                setCattleData([response.data]);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cattle data: ", error);
                setError("Error fetching cattle data");
                //router.push(`/error?errorMessage=${error}`);
            } finally {
                setLoading(false);
            }
        };
        console.log("fetching cattle data");
        fetchCattleData();
    }, [id, router]);
    
    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    // if (error) {
    //     router.push(`/error?errorMessage=${error}`);
    // }


    return (
        <div className="p-4">
            {cattleData.map(cattle => (
                <div>
                <text>{cattle.entryId}</text><br></br>
                <text>{cattle.patientIdentification.age}</text><br></br>
                </div>
            ))}
        </div>
    );
};

export default Livestock_Single_View_Page;