import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import NotFound from '../NotFound/NotFound';

const MemoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const memoriesList = useAppSelector((state) => state.memories.list);
  const memory = memoriesList.find((memory) => memory.id.toString() === id);


  if (!memory) {
    return <NotFound />;
  }

    // Convertir la date en objet Date
    const memoryDate = new Date(memory.picture_date);
    // Formater la date pour afficher sans les secondes
    const formattedDate = memoryDate.toLocaleString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  

  return (
    <div className="text-center max-w-lg mx-auto">
      <h1 className="text-xl lg:text-3xl pt-10 pb-5">{memory.title} </h1>
      <p>Ajouté par xxx le {formattedDate}</p>
      <p className="pb-5">
        {memory.place.name} / {memory.place.type}
      </p>
      <div className='mx-8'>
        <img src={memory.main_picture} alt="" className="rounded-xl" />
      </div>
      <p className='text-sm px-10 mt-5 mb-5'>{memory.content}</p>
    </div>
  );
};

export default MemoryPage;
