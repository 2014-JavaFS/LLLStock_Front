"use client";
import { useRouter } from "next/router";
import { NextPage } from "next";

interface patientIdentificationInfo {
    animalId: number;
    breed: string;
    age: number;
    sex: string;
    owner_info: string;
}

interface medicalHistoryInfo {
    previousIllnesses: string;
    previousTreatments: string;
    vaccinationHistory: string;
}

interface currentConditionInfo {
    examinationDate: string;
    clinicalSigns: string;
    diagnosis: string;
    diagnosticTests: string;
}

interface treatmentPlanInfo {
    medicationsPrescribed: string;
    antibiotics: string;
    treatmentProcedures: string;
    followupInstructions: string;
}

interface healthMonitoringInfo {
    monitoringSchedule: string;
    progressNotes: string;
}

interface recordKeepingInfo {
    vetDetails: string;
    recordDate: string;
    signature: string;
}

interface additionalNotesInfo {
    environmentalFactors: string;
    behavioralObservations: string;
}

interface livestockRecordInfo {
    entryId: number;
    ownerId: number;
    patientIdentification: patientIdentificationInfo;
    medicalHistory: medicalHistoryInfo;
    currentCondition: currentConditionInfo;
    treatmentPlan: treatmentPlanInfo;
    healthMonitoring: healthMonitoringInfo;
    recordKeeping: recordKeepingInfo;
    additionalNotes: additionalNotesInfo;
}

const Farmer: NextPage = () => {
    const router = useRouter();
    const {id} = router.query;

    if(!id || Array.isArray(id)) {
        return <p>Invalid Farmer ID</p>
    }

    return (
        <>
            <h1>This is the Farmer's page.</h1>
            <p>farmer id: {id}</p>
        </>
    );
}
export default Farmer;
