"use client";
import { useParams, useRouter } from "next/navigation";
import { NextPage } from "next";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { lllServer } from "@/utils/lllServer";
import type { Farmer } from "../../types/farmer";

const Farmer: NextPage = () => {
    const params = useParams();
    const userId = params.userId;
    const router = useRouter();
    const [farmer, setFarmer] = useState<Farmer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFarmer = async () => {
            if (!userId || Array.isArray(userId)) {
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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (farmer) {
            setFarmer({
                ...farmer,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!farmer || !userId || Array.isArray(userId)) return;

        try {
            await lllServer.put(`/users/${userId}`, farmer, {
                headers: {
                    'userId': userId.toString()
                }
            });
            alert("Farmer information updated successfully!");
        } catch (error) {
            console.error("Error updating farmer data: ", error);
            setError("Error updating farmer data");
        }
    };

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
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-80">
                <h1 className="text-2xl font-bold mb-6 text-center">Edit Farmer Information</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={farmer.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={farmer.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={farmer.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={farmer.password}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Farmer;
