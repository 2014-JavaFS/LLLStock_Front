"use client"; // Add this line to mark the file as a Client Component

import React, { useState, useEffect } from 'react';
import Selection_Card from "../custom-components/selection_card";

interface Cattle {
    id: string;
    name: string;
    description: string;
}

const Livestock_Select_Page: React.FC = () => {
    const [cattleData, setCattleData] = useState<Cattle[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCattleData = async () => {
            try {
                const response = await fetch('/api/cattle');
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
        return (
          <div className="p-4 text-center">
               <p className="text-red-500">Failed to get data</p>
          </div>);
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
