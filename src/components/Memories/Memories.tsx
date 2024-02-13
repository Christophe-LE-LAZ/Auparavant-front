import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import Card from '../../components/Card/Card';

const Memories= () => {
  const memoriesList = useAppSelector((state)=> state.memories.list);

  return (
    <div>
      <h2 className='text-center text-2xl pb-10'>Liste des souvenirs</h2>
      <div>
        <ul className='flex flex-wrap'>
          {memoriesList.map((memory) => (
            <li className='mx-auto' key={memory.memory_id}>
              <Link to={`/memories/${memory.memory_id}`}>
                <Card memory={memory} />
              </Link>
            </li>
          ))}
       </ul>
      </div>
    </div>
  );
};

export default Memories;
