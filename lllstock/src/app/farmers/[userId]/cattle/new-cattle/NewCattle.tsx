import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { lllServer } from '@/utils/lllServer';
import { Cattle } from '@/app/types/cattle';
//import { Menu } from 'lucide-react';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Button } from '@/components/ui/button';

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
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setPatientIdentification(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
        const newCattleRecord: Cattle = {
            entryId: 0,
            patientIdentification: patientIdentification,
            medicalHistory: { previous_illnesses: '', previous_treatments: {
                medications_prescribed: '', antibiotics: '', treatment_procedures: '', followup_instructions: ''
            }, vaccination_history: '' },
            condition: { examination_date: '', diagnosis: '', diagnosis_tests: '', symptoms: ''},
            plan: { medications_prescribed: '', antibiotics: '', treatment_procedures: '', followup_instructions: '' },
            health: { monitoring_schedule: '', progress_notes: '' },
            vetRecord: { vet_details: {
              userId: 0, firstName: '', lastName: '', email: ''
            }, record_date: '', signature: '' },
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label htmlFor="breed" className="block text-gray-700">Breed:</label>
              <input type="text" id="breed" name="breed" className="border rounded-md p-2 w-full" 
              value={patientIdentification.breed} onChange={handleInputChange} required />
          </div>
          <div className="mb-4">
              <label htmlFor="age" className="block text-gray-700">Age:</label>
              <input type="number" id="age" name="age" className="border rounded-md p-2 w-full" 
              value={patientIdentification.age} onChange={handleInputChange} required />
          </div>
          <div className="mb-4">
              <label htmlFor="sex" className="block text-gray-700">Sex:</label>
              <select id="sex" name="sex" className="border rounded-md p-2 w-full" 
              value={patientIdentification.sex} onChange={handleSelectChange} required>
                  <option value="">Select Sex</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
              </select>
          </div>
          <Button type="submit" className="w-full bg-blue-700 text-white text-lg p-2 rounded-md">Submit</Button>
        </form>
      </div>
    );
  };
  
  export default NewCattle;