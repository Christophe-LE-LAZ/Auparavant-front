import React from 'react';
import { IMemory } from '../../types/memory';

interface Props {
  memory: IMemory;
}

export default function Memory({ memory }: Props) {
  return (
    <div className="text-center max-w-lg mx-auto">
      <div className="card w-4/4 bg-gray-100 shadow-xl mx-auto mb-10 lg:mx-8">
        <h2 className="text-sm lg:text-xl pt-4">{memory.title} </h2>
        <figure className="px-10 pt-4">
          <img
            src="https://images.unsplash.com/photo-1523435324848-a7a613898152?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
            alt=""
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <p className="my-2">{memory.published_at}</p>
          <p className="text-sm">{memory.content}</p>
          <p>Ville</p>
        </div>
      </div>
    </div>
  );
}
