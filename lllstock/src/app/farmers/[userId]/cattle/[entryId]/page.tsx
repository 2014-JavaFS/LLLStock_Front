"use client";
import { useParams, useRouter } from "next/navigation";
import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { lllServer } from "@/utils/lllServer";
import type { CattleRecord } from "@/app/types/cattle";

const CattleRecord: NextPage = () => {
    const params = useParams();
    const entryId = params.entryId;
    const router = useRouter();
    const [cattleRecord, setCattleRecord] = useState<CattleRecord | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFarmer = async () => {
            if(!entryId || Array.isArray(entryId)) {
                setError("Invalid user id");
                setLoading(false);
                return;
            }

            try {
                const response = await lllServer.get<CattleRecord>(`/medicalRecord/entry`,{
                    params:{
                        'entryId': entryId.toString()
                    }
                });
                setCattleRecord(response.data);
            } catch (error) {
                console.error("Error fetching cattle record: ", error);
                setError("Error fetching cattle record");
                router.push(`/error?errorMessage=${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchFarmer();
    }, [router, entryId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!cattleRecord) {
        return <p>Cattle Record not found</p>;
    }

    return (
        <>
            <h1>Cattle Information</h1>
            <p>Entry ID: {cattleRecord.entryId}</p>
            <p>Animal Breed: {cattleRecord.patientIdentification.breed}</p>
            <p>Age: {cattleRecord.patientIdentification.age}</p>
            <p>Sex: {cattleRecord.patientIdentification.sex}</p>
        </>
    );
}
export default CattleRecord;