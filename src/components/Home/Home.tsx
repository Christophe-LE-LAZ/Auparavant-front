import React from 'react'
import Slider from '../Slider/Slider';
import Map from '../Map/Map';
import Card from '../../components/Card/Card'
import './Home.scss';

export default function Home() {
  return (
    <div className=''>
      <div className=''>
        <h1 className='flex justify-center py-3 text-lg' >O' Mais y'avait quoi avant</h1>
        <p className='pb-3 w-3/4 mx-auto text-center text-sm lg:text-base '>
        Nos villes évoluent, et par conséquent nos quartiers, nos lieux préférés également... Saurions nous dire ce qu'il y avait avant à tel endroit ? Probablement que non. Après avoir constaté cela, on s'interroge, existe-t-il des ressources sur le web nous permettant facilement d'accéder à la donnée ?
        </p>
      </div>
      <Slider />
      <Map />
      <Card />
    </div>

  )
}
