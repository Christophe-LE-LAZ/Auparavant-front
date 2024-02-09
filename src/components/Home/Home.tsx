import React from 'react'
import Slider from '../Slider/Slider';
import Map from '../Map/Map';
import Card from '../../components/Card/Card'
import './Home.scss';

export default function Home() {
  return (
    <div className='max-'>
      <div className=''>
        <h1 className='flex justify-center text-xl py-3 lg:text-3xl lg:py-14' >O' Mais y'avait quoi avant</h1>
        <p className='pb-3 w-3/4 mx-auto text-center text-sm lg:text-base lg:leading-relaxed'>
        Nos villes évoluent, et par conséquent nos quartiers, nos lieux préférés également... Saurions nous dire ce qu'il y avait avant à tel endroit ? Probablement que non. Après avoir constaté cela, on s'interroge, existe-t-il des ressources sur le web nous permettant facilement d'accéder à la donnée ? Wikipédia répond en partie à ça mais il faut souvent multiplier les recherches pour trouver les informations sur un lieu à différentes époques.
        </p>
      </div>
      <Slider />
      <Map />
      <Card />
    </div>

  )
}
