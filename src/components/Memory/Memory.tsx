import React from 'react';
import { IMemory } from '../../types/memory';

interface Props {
  memory: IMemory;
}


export default function Memory({ memory }: Props) {
  console.log(memory)
  return (
  <li>{memory.title} - {memory.content}</li>
  );
  
}
