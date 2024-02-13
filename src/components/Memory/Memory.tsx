import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';


const MemoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const memoriesList = useAppSelector((state)=> state.memories.list);
  const memory = memoriesList.find(memory => memory.memory_id.toString() === id);

  
  return (
    
        <h2 className="text-sm lg:text-xl pt-4">{memory.title} </h2>
        
  );
};

export default MemoryPage;
