"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Selection_Card from "../../components/ui/selection_card";
import { Cattle } from '../types/cattle';
import type { Farmer } from '../types/farmer';
import { useParams, useRouter } from "next/navigation";
import { NextPage } from "next";
import { lllServer } from "@/utils/lllServer";

const Livestock_Single_View_Page: React.FC<{ cattle: Cattle }> = ({ cattle }) => {
    const params = useParams();
    const userId = params.userId;
    const animalId = params.animalId;
    const [cattleData, setCattleData] = useState<Cattle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchCattleData = async () => {
            if (!animalId || Array.isArray(animalId)) {
                setError("Invalid animal id");
                setLoading(false);
                return;
            }
            try {
                const response = await lllServer.get(`/medicalRecord/animal`, {
                    params: { animalId: animalId }
                });
                setCattleData([response.data]);
            } catch (error) {
                console.error("Error fetching cattle data: ", error);
                setError("Error fetching cattle data");
                router.push(`/error?errorMessage=${error}`);
            } finally {
                setLoading(false);
            }
        };
        fetchCattleData();
    }, [router, animalId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (cattle) {
            setCattleData((prevState: Cattle[]) => [
                ...prevState,
                {
                    ...cattle,
                    [e.target.name]: e.target.value,
                    length: 0
                }
            ]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!cattle || !userId || Array.isArray(userId)) return;

        try {
            await lllServer.patch(`/medicalRecord/animal`, cattle);
            alert("Livestock information updated successfully!");
        } catch (error) {
            console.error("Error updating livestock data: ", error);
            setError("Error updating livestock data");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // if (!cattle) {
    //     return <p>Cattle not found</p>;
    // }

    return (
        <div className="p-4">
            {cattleData.map(cattle => (
                <div>
                    <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Livestock Information {cattle.entryId}</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Livestock details</p>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Owner Name</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <div><strong>First Name:</strong> {cattle.patientIdentification.owner_info.firstName}</div>
                                <div><strong>Last Name:</strong> {cattle.patientIdentification.owner_info.lastName}</div>
                            </dd>
                            <dt className="text-sm font-medium leading-6 text-gray-900">Owner Email</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.patientIdentification.owner_info.email} 
                            />
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Patient ID</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.patientIdentification.animal_id}
                                readOnly
                            />
                            <dt className="text-sm font-medium leading-6 text-gray-900">Patient Breed</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.patientIdentification.breed}
                                onChange={handleInputChange}
                            />
                            <dt className="text-sm font-medium leading-6 text-gray-900">Patient Age</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.patientIdentification.age}
                                onChange={handleInputChange}
                            />
                            <dt className="text-sm font-medium leading-6 text-gray-900">Patient Sex</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.patientIdentification.sex}
                                readOnly
                            />
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Previous Illnesses</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.medicalHistory.previous_illnesses.length > 0 ? cattle.medicalHistory.previous_illnesses.join(', ') : ''} 
                            />
                            <dt className="text-sm font-medium leading-6 text-gray-900">Previous Treatment</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {cattle.medicalHistory.previous_treatments.length > 0 ? (
                                    cattle.medicalHistory.previous_treatments.map((treatment, index) => (
                                        <div key={index} className="mb-4">
                                            <div><strong>Medications Prescribed: </strong>
                                                <input 
                                                    className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 w-full" 
                                                    value={treatment.medications_prescribed.length > 0 ? treatment.medications_prescribed.join(', ') : ''} 
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div><strong>Antibiotics: </strong>
                                                <input 
                                                    className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 w-full" 
                                                    value={treatment.antibiotics.length > 0 ? treatment.antibiotics.join(', ') : ''} 
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div><strong>Treatment Procedures: </strong>
                                                <input 
                                                    className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 w-full" 
                                                    value={treatment.treatment_procedures} 
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div><strong>Follow-up Instructions: </strong>
                                                <input 
                                                    className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 w-full" 
                                                    value={treatment.followup_instructions} 
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <span>No previous treatments</span>
                                )}
                            </dd>
                            <dt className="text-sm font-medium leading-6 text-gray-900">Vaccination History</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.medicalHistory.vaccination_history.length > 0 ? cattle.medicalHistory.vaccination_history.join(', ') : ''} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Examination Date</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.condition.examination_date}
                                onChange={handleInputChange}
                            />
                            <dt className="text-sm font-medium leading-6 text-gray-900">Diagnosis</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.condition.diagnosis} 
                                onChange={handleInputChange}
                            />
                            <dt className="text-sm font-medium leading-6 text-gray-900">Diagnosis Tests</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.condition.diagnosis_tests.length > 0 ? cattle.condition.diagnosis_tests.join(', ') : ''} 
                                onChange={handleInputChange}
                            />
                            <dt className="text-sm font-medium leading-6 text-gray-900">Symptoms</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.condition.symptoms.length > 0 ? cattle.condition.symptoms.join(', ') : ''} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Medications Prescribed</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.plan.medications_prescribed.length > 0 ? cattle.plan.medications_prescribed.join(', ') : ''} 
                                onChange={handleInputChange}
                            />
                            <dt className="text-sm font-medium leading-6 text-gray-900">Antibiotics</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.plan.antibiotics.length > 0 ? cattle.plan.antibiotics.join(', ') : ''} 
                                onChange={handleInputChange}
                            />
                            <dt className="text-sm font-medium leading-6 text-gray-900">Treatment Procedures</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.plan.treatment_procedures} 
                                onChange={handleInputChange}
                            />
                            <dt className="text-sm font-medium leading-6 text-gray-900">Follow-up Instructions</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.plan.followup_instructions} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Monitoring Schedule</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.health.monitoring_schedule} 
                                onChange={handleInputChange}
                            />
                            <dt className="text-sm font-medium leading-6 text-gray-900">Progress Notes</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.health.progress_notes} 
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Vet Name</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <div><strong>First Name:</strong> {cattle.vetRecord.vet_details.firstName}</div>
                                <div><strong>Last Name:</strong> {cattle.vetRecord.vet_details.lastName}</div>
                            </dd>
                            <dt className="text-sm font-medium leading-6 text-gray-900">Vet Email</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{cattle.vetRecord.vet_details.email}</dd>
                            <dt className="text-sm font-medium leading-6 text-gray-900">Record Date</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{cattle.vetRecord.record_date}</dd>
                            <dt className="text-sm font-medium leading-6 text-gray-900">Signature</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{cattle.vetRecord.signature}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Environmental Factors</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.notes.environmental_factors}
                                onChange={handleInputChange}
                            />
                            <dt className="text-sm font-medium leading-6 text-gray-900">Behavioral Observations</dt>
                            <input 
                                className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" 
                                value={cattle.notes.behavioral_observations}
                                onChange={handleInputChange}
                            />
                        </div>
                    </dl>
                </div>
                <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </button>
              </div>
            ))}
        </div>
    );
};

export default Livestock_Single_View_Page;