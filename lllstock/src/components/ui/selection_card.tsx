"use client"; // Add this line to mark the file as a Client Component

import React from 'react';
import { useRouter } from 'next/router';

interface Cattle {
    id: string;
    name: string;
    description: string;
}

interface SelectionCardProps {
    cattle: Cattle;
}

const Selection_Card: React.FC<SelectionCardProps> = ({ cattle }) => {


    return (
        <div 
            className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-300 m-4 cursor-pointer hover:shadow-xl transition-shadow duration-300"
        >
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{cattle.name}</div>
                <p className="text-gray-700 text-base">
                    {cattle.description}
                </p>
            </div>
        </div>
    );
}

export default Selection_Card;
