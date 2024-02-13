import React from 'react'
import { IMemory } from '../../types/memory';
import { Link } from 'react-router-dom';

interface Props {
  memory : IMemory;
}

export default function Card({ memory }: Props) {
  return (

    <div className="text-center max-w-lg mx-auto">
      <div className="card w-4/4 bg-gray-100 shadow-xl mx-auto mb-10 lg:mx-8">
        <h2 className="text-sm lg:text-xl pt-4">{memory.title} </h2>
        <figure className="px-10 pt-4">
          <img
            src={memory.main_picture}
            alt=""
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <p className="text-sm">{memory.content}</p>
          <p>Ville</p>
        </div>
        <Link to={`/memories/${memory.id}`}>
              </Link>

      </div>
    </div>
  )
}
