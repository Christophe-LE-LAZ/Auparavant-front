import React from 'react'
import { useAppSelector } from '../../hooks';
import Memory from '../Memory/Memory';


export default function Memories() {

const memoriesList = useAppSelector((state)=> state.memories.list);

console.log(memoriesList)

  return (
    <div>
      <h2>Liste des souvenirs</h2>
      <ul>
        {memoriesList.map((memory) => (
          <Memory key={memory.memory_id} memory={memory} />
        ))}
      </ul>
    </div>
  )
}
