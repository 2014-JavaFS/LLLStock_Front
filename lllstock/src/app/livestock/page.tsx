"use client"; // Ensure this is at the top of your file

import React, { useState, useEffect } from 'react';
import Selection_Card from "../../components/ui/selection_card";
import type { Cattle } from '../types/cattle';
import type { Farmer } from '../types/farmer';
import { useParams, useRouter } from "next/navigation";
import { NextPage } from "next";
import { lllServer } from "@/utils/lllServer";

const Livestock_Select_Page: React.FC<{ farmer: Farmer }> = ({ farmer }) => {
    const [cattleData, setCattleData] = useState<Cattle[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        
    });

    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    if (error) {
        router.push(`/error`);
    }

    if (!cattleData || cattleData.length === 0) {
        const sampleData: Cattle = {
            id: '1',
            name: 'Sample Cattle',
            breed: 'angus',
            age: '32',
            sex: 'male',
            owner_info: 'Tommy Hoang',
            description: 'This is a sample cattle',
            previous_illnesses: '',
            previous_treatments: '',
            vaccination_history: '',
            examination_date: '',
            symptoms: '',
            diagnosis: '',
            diagnostic_tests: '',
            medications_prescribed: '',
            antibiotics: '',
            treatment_procedures: '',
            followup_instructions: '',
            monitoring_schedule: '',
            progress_notes: '',
        };

        return (
            <div className="p-4 text-center">
                <p className="text-red-500">No cattle data available</p>
                <Selection_Card key={sampleData.id} cattle={sampleData} />
            </div>
        );
    }

    return (
        <div className="p-4">
            {cattleData.map(cattle => (
                <Selection_Card key={cattle.id} cattle={cattle} />
            ))}
        </div>
    );
};

export default Livestock_Select_Page;
