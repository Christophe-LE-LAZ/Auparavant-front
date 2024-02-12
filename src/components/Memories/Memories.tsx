import React from 'react'
import { useAppSelector } from '../../hooks';
import Memory from '../Memory/Memory';


export default function Memories() {

const memoriesList = useAppSelector((state)=> state.memories.list);

  return (
    <div>
      <h2 className='text-center text-2xl pb-10'>Liste des souvenirs</h2>
      <div>
        <ul className='flex flex-wrap'>
          {memoriesList.map((memory) => (
            <Memory key={memory.memory_id} memory={memory} />
         ))}
       </ul>
      </div>
    </div>
  )
}
