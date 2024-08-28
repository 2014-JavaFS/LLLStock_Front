"use client"; // Mark this file as a Client Component

import React from 'react';
import { useRouter } from 'next/navigation'; // To navigate back
import type { Cattle } from '../types/cattle'; // Assume you have a Cattle type definition

interface LivestockTablePageProps {
    cattle: Cattle | null; // Allow for the possibility of null or invalid data
}

const Livestock_Table_Page: React.FC<LivestockTablePageProps> = ({ cattle }) => {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/edit-cattle/${cattle?.id}`);
    };

    const handleBack = () => {
        router.back();
    };

    if (!cattle || !cattle.id || !cattle.name || !cattle.description) {
        return (
            <div className="p-4 text-center">
                <p className="text-red-500">Failed to render</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <button 
                    onClick={handleBack} 
                    className="px-4 py-2 bg-gray-500 text-white rounded">
                    Back
                </button>
                <button 
                    onClick={handleEdit} 
                    className="px-4 py-2 bg-blue-500 text-white rounded">
                    Edit
                </button>
            </div>
            <div className="border border-gray-300 rounded p-4 shadow-lg">
                <h2 className="text-2xl font-bold mb-2">{cattle.name}</h2>
                <p className="text-gray-700 mb-2">{cattle.description}</p>
            </div>
        </div>
    );
};

export default Livestock_Table_Page;
