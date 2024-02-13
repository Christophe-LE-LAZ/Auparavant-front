import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import NotFound from '../NotFound/NotFound';

const MemoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const memoriesList = useAppSelector((state) => state.memories.list);
  const memory = memoriesList.find(
    (memory) => memory.id.toString() === id
  );

  if (!memory) {
    return <NotFound />;
  }

  return (
    <div className="text-center max-w-lg mx-auto">
      <h1 className="text-sm lg:text-xl pt-4">{memory.title} </h1>
      <p>Ajouté par xxx le xx/xx/xx</p>
      <p>Nom du lieu / type de lieu</p>
      <img
            src={memory.main_picture}
            alt=""
            className="rounded-xl mx-auto"
          />

      <p>{memory.content}</p>
      
    </div>
  );
};

export default MemoryPage;
