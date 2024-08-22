"use client"; // Ensure this is at the top of your file

import React, { useState, useEffect } from 'react';
import Selection_Card from "../../components/ui/selection_card";
import { Cattle } from '../types/cattle';
import { Owner } from '../types/owner';

const Livestock_Select_Page: React.FC = () => {
    const [cattleData, setCattleData] = useState<Cattle[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCattleData = async () => {
            try {
                const response = await fetch(`localhost:3000/${Owner.user_id}/cattle`);
                const data: Cattle[] = await response.json();
                setCattleData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setCattleData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCattleData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
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
               <p className="text-red-500">Failed to get data</p>
               <Selection_Card key={sampleData.id} cattle={sampleData} />
          </div>
        );
    }

    return (
        <div>
            {cattleData.map(cattle => (
                <Selection_Card key={cattle.id} cattle={cattle} />
            ))}
        </div>
    );
};

export default Livestock_Select_Page;
