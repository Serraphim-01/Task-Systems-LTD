'use client';

import { useState, useEffect } from 'react';
import DirectorForm from './DirectorForm';
import DirectorList from './DirectorList';
import ManagementForm from './ManagementForm';
import ManagementList from './ManagementList';
import { Separator } from '../ui/separator';
import { getDirectors, getManagement } from './people-actions';

export default function PeopleManager() {
  const [directors, setDirectors] = useState<any[]>([]);
  const [management, setManagement] = useState<any[]>([]);
  const [editingDirector, setEditingDirector] = useState<any | null>(null);
  const [editingManagement, setEditingManagement] = useState<any | null>(null);
  const [key, setKey] = useState(0); // Key to force re-render of lists

  const fetchData = async () => {
    const directorsData = await getDirectors();
    const managementData = await getManagement();
    setDirectors(directorsData);
    setManagement(managementData);
  };

  useEffect(() => {
    fetchData();
  }, [key]);

  const handleFinished = () => {
    setEditingDirector(null);
    setEditingManagement(null);
    setKey(prev => prev + 1); // Trigger re-fetch
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Board of Directors</h2>
        <DirectorList directors={directors} onEdit={setEditingDirector} onUpdate={handleFinished} />
        <Separator className="my-8" />
        <DirectorForm director={editingDirector} onFinished={handleFinished} />
      </div>
      <Separator className="my-8" />
      <div>
        <h2 className="text-2xl font-semibold mb-6">Management Team</h2>
        <ManagementList management={management} onEdit={setEditingManagement} onUpdate={handleFinished} />
        <Separator className="my-8" />
        <ManagementForm management={editingManagement} onFinished={handleFinished} />
      </div>
    </div>
  );
};
