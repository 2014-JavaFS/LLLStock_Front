"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Selection_Card from "../../components/ui/selection_card";
import { Cattle } from "../types/cattle";
import type { Farmer } from "../types/farmer";
import { useParams, useRouter } from "next/navigation";
import { NextPage } from "next";
import { lllServer } from "@/utils/lllServer";

const Livestock_Single_View_Page: React.FC<{ cattle: Cattle }> = ({
  cattle,
}) => {
  const params = useParams();
  const userId = params.userId;
  const animalId = 31;
  const [cattleData, setCattleData] = useState<Cattle[]>([cattle]);
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
          params: { animalId: animalId },
        });
        console.log("response: ", response.data);
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
    console.log("name: ", e.target.name);
    console.log("value: ", e.target.value);
    console.log(cattleData);
    e.preventDefault();
    // Destructure the input name and value
    const { name, value } = e.target;

    // Create a new state object by updating the relevant field
    setCattleData((prevData) => {
      const updatedData = [...prevData];

      // Split the name to handle nested properties
      const nameParts = name.split(".");
      console.log("nameParts: ", nameParts);
      const updatedCattle = { ...updatedData[0] };

      let currentObject: any = updatedData[0];
      for (let i = 0; i < nameParts.length - 1; i++) {
        const part = nameParts[i];

        currentObject = currentObject[part];
      }

      currentObject[nameParts[nameParts.length - 1]] = value;
      console.log(currentObject);

      updatedData[0] = updatedCattle;

      return updatedData;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!cattleData || Array.isArray(userId)) {
      console.log(cattle, userId, Array.isArray(userId));
      return;
    }

    try {
      await lllServer.patch(`/medicalRecord/animal`, cattleData[0]);
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
      {cattleData.map((cattle) => (
        <div>
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Livestock Information {cattleData[0].entryId}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Livestock details
            </p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Owner Name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <div>
                    <strong>First Name:</strong>{" "}
                    {cattleData[0].patientIdentification.owner_info.firstName}
                  </div>
                  <div>
                    <strong>Last Name:</strong>{" "}
                    {cattleData[0].patientIdentification.owner_info.lastName}
                  </div>
                </dd>
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Owner Email
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={cattleData[0].patientIdentification.owner_info.email}
                />
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Patient ID
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={cattleData[0].patientIdentification.animal_id}
                  readOnly
                />
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Patient Breed
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={cattleData[0].patientIdentification.breed}
                  onChange={handleInputChange}
                  name="patientIdentification.breed"
                />
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Patient Age
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={cattleData[0].patientIdentification.age}
                  onChange={handleInputChange}
                  name="patientIdentification.age"
                />
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Patient Sex
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={cattleData[0].patientIdentification.sex}
                  readOnly
                />
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Previous Illnesses
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={
                    cattleData[0].medicalHistory.previous_illnesses.length > 0
                      ? cattleData[0].medicalHistory.previous_illnesses
                      : ""
                  }
                  name="medicalHistory.previous_illnesses"
                  onChange={handleInputChange}
                />
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Previous Treatment
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {/* {cattleData[0].medicalHistory.previous_treatments ? ( */}
                  {/* //cattleData[0].medicalHistory.previous_treatments.map((treatment, index) => ( */}
                  <div className="mb-4">
                    <div>
                      <strong>Medications Prescribed: </strong>
                      {/* TODO: change to handle a string instead of array of strings after changing property in backend */}
                      <input
                        className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 w-full"
                        value={cattleData[0].medicalHistory.previous_treatments.medications_prescribed
                        }
                        onChange={handleInputChange}
                        name="medicalHistory.previous_treatments.medications_prescribed"
                      />
                    </div>
                    <div>
                      <strong>Antibiotics: </strong>
                      <input
                        className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 w-full"
                        value={
                          cattleData[0].medicalHistory
                                .previous_treatments.antibiotics
                        }
                        onChange={handleInputChange}
                        name="medicalHistory.previous_treatments.antibiotics"
                      />
                    </div>
                    <div>
                      <strong>Treatment Procedures: </strong>
                      <input
                        className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 w-full"
                        value={
                          cattleData[0].medicalHistory.previous_treatments
                            .treatment_procedures
                        }
                        onChange={handleInputChange}
                        name="medicalHistory.previous_treatments.treatment_procedures"
                      />
                    </div>
                    <div>
                      <strong>Follow-up Instructions: </strong>
                      <input
                        className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 w-full"
                        value={
                          cattleData[0].medicalHistory.previous_treatments
                            .followup_instructions
                        }
                        onChange={handleInputChange}
                        name="medicalHistory.previous_treatments.followup_instructions"
                      />
                    </div>
                  </div>
                </dd>
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Vaccination History
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={
                    cattleData[0].medicalHistory.vaccination_history
                  }
                  onChange={handleInputChange}
                  name="medicalHistory.vaccination_history"
                />
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Examination Date
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={cattleData[0].condition.examination_date}
                  onChange={handleInputChange}
                  name="condition.examination_date"
                />
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Diagnosis
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={cattleData[0].condition.diagnosis}
                  onChange={handleInputChange}
                  name="condition.diagnosis"
                />
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Diagnosis Tests
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={
                      cattleData[0].condition.diagnosis_tests
                  }
                  onChange={handleInputChange}
                  name="condition.diagnosis_tests"
                />
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Symptoms
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={
                      cattleData[0].condition.symptoms
                  }
                  onChange={handleInputChange}
                  name="condition.symptoms"
                />
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Medications Prescribed
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={cattleData[0].plan.medications_prescribed
                  }
                  onChange={handleInputChange}
                  name="plan.medications_prescribed"
                />
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Antibiotics
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={
                      cattleData[0].plan.antibiotics
                  }
                  onChange={handleInputChange}
                  name="plan.antibiotics"
                />
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Treatment Procedures
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={cattleData[0].plan.treatment_procedures}
                  onChange={handleInputChange}
                  name="plan.treatment_procedures"
                />
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Follow-up Instructions
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={cattleData[0].plan.followup_instructions}
                  onChange={handleInputChange}
                  name="plan.followup_instructions"
                />
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Monitoring Schedule
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={cattleData[0].health.monitoring_schedule}
                  onChange={handleInputChange}
                  name="health.monitoring_schedule"
                />
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Progress Notes
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={cattleData[0].health.progress_notes}
                  onChange={handleInputChange}
                  name="health.progress_notes"
                />
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Environmental Factors
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={cattleData[0].notes.environmental_factors}
                  onChange={handleInputChange}
                  name="notes.environmental_factors"
                />
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Behavioral Observations
                </dt>
                <input
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  value={cattleData[0].notes.behavioral_observations}
                  onChange={handleInputChange}
                  name="notes.behavioral_observations"
                />
              </div>
            </dl>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      ))}
    </div>
  );
};

export default Livestock_Single_View_Page;
