import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import NotFound from '../NotFound/NotFound';

const MemoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const memoriesList = useAppSelector((state) => state.memories.list);
  const memory = memoriesList.find(
    (memory) => memory.memory_id.toString() === id
  );

  if (!memory) {
    return <NotFound />;
  }

  return (
    <div className="text-center max-w-lg mx-auto">
      <h1 className="text-sm lg:text-xl pt-4">{memory.title} </h1>
      <p>Ajouté par xxx le {memory?.created_at}</p>
      <p>Nom du lieu / type de lieu</p>
      <img
            src="https://images.unsplash.com/photo-1523435324848-a7a613898152?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
            alt=""
            className="rounded-xl mx-auto"
          />

      <p>{memory.content}</p>
      
    </div>
  );
};

export default MemoryPage;
