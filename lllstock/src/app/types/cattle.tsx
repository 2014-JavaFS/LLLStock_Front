export interface OwnerInfo {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface PatientIdentification {
  animal_id: number;
  breed: string;
  age: number;
  sex: string;
  owner_info: OwnerInfo;
}

export interface PreviousTreatment {
  medications_prescribed: string;
  antibiotics: string;
  treatment_procedures: string;
  followup_instructions: string;
}

export interface MedicalHistory {
  previous_illnesses: string;
  previous_treatments: PreviousTreatment;
  vaccination_history: string;
}

export interface Condition {
  examination_date: string;
  diagnosis: string;
  diagnosis_tests: string;
  symptoms: string;
}

export interface Plan {
  medications_prescribed: string;
  antibiotics: string;
  treatment_procedures: string;
  followup_instructions: string;
}

export interface VetDetails {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface VetRecord {
  vet_details: VetDetails;
  record_date: string;
  signature: string;
}

export interface Notes {
  environmental_factors: string;
  behavioral_observations: string;
}

export interface Health {
  monitoring_schedule: string;
  progress_notes: string;
}

export interface Cattle {
  entryId: number;
  patientIdentification: PatientIdentification;
  medicalHistory: MedicalHistory;
  condition: Condition;
  plan: Plan;
  health: Health;
  vetRecord: VetRecord;
  notes: Notes;
}