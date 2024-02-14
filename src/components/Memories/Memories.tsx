import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Card from '../../components/Card/Card';
import { fetchMemories } from '../../store/memories';

const Memories= () => {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMemories());
  }, []);

  
  const memoriesList = useAppSelector((state)=> state.memories.list);

  return (
    <div>
      <h2 className='text-center text-2xl pb-10'>Liste des souvenirs</h2>
      <div>
        <ul className='flex flex-wrap'>
          {memoriesList.map((memory) => (
            <li className='mx-auto' key={memory.id}>
              <Link to={`/memories/${memory.id}`}>
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
