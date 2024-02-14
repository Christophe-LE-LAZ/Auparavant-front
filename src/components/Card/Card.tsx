import React from 'react';
import { IMemory } from '../../types/memory';
import { Link } from 'react-router-dom';

interface Props {
  memory: IMemory;
}

export default function Card({ memory }: Props) {

  // Convertir la date en objet Date
  const memoryDate = new Date(memory.picture_date);
  // Formater la date pour afficher sans les secondes
  const formattedDate = memoryDate.toLocaleString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  
  return (
    <Link to={`/memories/${memory.id}`}>
      <div className="text-center max-w-lg mx-auto ">
        <div className="card w-4/4 bg-gray-100 shadow-xl mx-auto mb-10 lg:mx-8">
          <h2 className="text-lg lg:text-xl pt-4">{memory.title} </h2>
          <p>{formattedDate}</p>
          <h3>{memory.location.city}</h3>
          <figure className="px-7 pt-4 max-h-72 w-auto">
            <img
              src={memory.main_picture}
              alt=""
              className="rounded-xl w-96 h-72"
            />
          </figure>
          <div className="card-body items-center text-center ">
            
            
          </div>
        </div>
      </div>
    </Link>
  );
}
