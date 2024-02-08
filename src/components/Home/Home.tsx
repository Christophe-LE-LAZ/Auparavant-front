import React from 'react'
import Slider from '../Slider/Slider';
import Map from '../Map/Map';
import './Home.scss';

export default function Home() {
  return (
    <div className=''>
      <div className=''>
        <h1 className='flex justify-center py-4' >O' Mais y'avait quoi avant</h1>
        <p className='py-4 w-3/4 mx-auto text-center text-xs'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum harum iusto et dolorem tempore enim, placeat explicabo quis iure quae eligendi voluptate consequuntur cupiditate reiciendis magnam quaerat delectus qui magni minima veniam possimus repellendus. Perspiciatis accusantium repellat repellendus, quaerat odio dicta optio nostrum molestias voluptas iure doloribus dolor fugit ad!
        </p>
      </div>
      <Slider />
      <Map />
    </div>

  )
}
