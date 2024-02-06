import React from 'react';
import './Navbar.scss';

export default function Navbar() {
  return (
    <div className="nav">
      <ul>
        <li>Accueil</li>
        <li>Voir les souvenirs</li>
        <li>Partager un souvenir</li>
      </ul>

      <input type='text' placeholder='Rechercher' className='input'/>

    </div>
  );
}
