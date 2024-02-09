import React from 'react'
import { IMemory } from '../../types/memory';

export default function Card() {
  return (
    <div className=''>
      <div className="card w-3/4 bg-red-100 shadow-xl mx-auto mb-10">
  <figure className="px-10 pt-10">
    <img src="https://images.unsplash.com/photo-1523435324848-a7a613898152?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80" alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-xs">lorem </h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda deserunt, aliquid sequi ut aperiam perferendis?</p>
    <div className="card-actions">
      <button className="btn btn-primary text-xs" >Voir +</button>
    </div>
  </div>
</div>


<div className="card w-3/4 bg-green-100 shadow-xl mx-auto mb-20">
  <figure className="px-10 pt-10">
    <img src="https://images.unsplash.com/photo-1523435324848-a7a613898152?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80" alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-xs">lorem </h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda deserunt, aliquid sequi ut aperiam perferendis?</p>
    <div className="card-actions">
      <button className="btn btn-primary text-xs" >Voir +</button>
    </div>
  </div>
</div>


    </div>
  )
}
