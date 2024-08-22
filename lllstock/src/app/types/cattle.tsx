export interface Cattle {
    //Patient Info
    id: string;
    name: string;
    breed: string;
    age: string;
    sex: string;
    owner_info: string;
    description: string;
    //Medical History
    previous_illnesses: string;
    previous_treatments: string;
    vaccination_history: string;
    //Current Condition
    examination_date: string;
    symptoms: string;
    diagnosis: string;
    diagnostic_tests: string;
    //Treatment Plan
    medications_prescribed: string;
    antibiotics: string;
    treatment_procedures: string;
    followup_instructions: string;
    //Health Monitoring
    monitoring_schedule: string;
    progress_notes: string;
}
