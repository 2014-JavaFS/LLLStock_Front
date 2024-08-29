import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { lllServer } from '@/utils/lllServer';
import { CattleRecord } from '@/app/types/cattle';

interface OwnerInfo {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
  }
  
  interface PatientIdentification {
    animal_id: number;
    breed: string;
    age: number;
    sex: string;
    owner_info: OwnerInfo;
  }
  
//   interface CattleRecord {
//     patientIdentification: PatientIdentification;
//   }
  
  interface NewCattleProps {
    farmer: OwnerInfo;
  }
  
  const NewCattle: React.FC<NewCattleProps> = ({ farmer }) => {
    const router = useRouter();
    const params = useParams();
    const farmerId = params.userId; 
  
    const initialPatientIdentification: PatientIdentification = {
      animal_id: 0,
      breed: '',
      age: 0,
      sex: '',
      owner_info: farmer
    };
  
    const [patientIdentification, setPatientIdentification] = useState<PatientIdentification>(initialPatientIdentification);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setPatientIdentification(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      try {
        const newCattleRecord: CattleRecord = {
            entryId: 0,
            patientIdentification: patientIdentification,
            medicalHistory: { previous_illnesses: '', previous_treatments: {
                medications_prescribed: '', antibiotics: '', treatment_procedures: '', followup_instructions: ''
            }, vaccination_history: '' },
            condition: { examination_date: '', diagnosis: '', diagnosis_tests: '', symptoms: ''},
            plan: { medications_prescribed: '', antibiotics: '', treatment_procedures: '', followup_instructions: '' },
            health: { monitoring_schedule: '', progress_notes: '' },
            vetRecord: { vet_details: { userId: 0, firstName: '', lastName: '', email: '' }, record_date: '', signature: '' },
            notes: { environmental_factors: '', behavioral_observations: '' }
        };
        await lllServer.post('/medicalRecord/animal', newCattleRecord);
        router.push(`/farmers/${farmerId}/cattle`);
      } catch (error) {
        console.error("Error inserting new animal: ", error);
        setError("Error inserting new animal");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
        <h1>Insert New Cattle</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Breed:</label>
            <input type="text" name="breed" value={patientIdentification.breed} onChange={handleChange} required />
          </div>
          <div>
            <label>Age:</label>
            <input type="number" name="age" value={patientIdentification.age} onChange={handleChange} required />
          </div>
          <div>
            <label>Sex:</label>
            <input type="text" name="sex" value={patientIdentification.sex} onChange={handleChange} required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  
  export default NewCattle;