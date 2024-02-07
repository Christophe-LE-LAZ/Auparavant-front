import React from 'react';
import './Navbar.scss';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      {/* Barre de navigation version Desktop */}
      <div className="navigation">
        <div className="navbar-top justify-center">
          <NavLink className="btn btn-ghost text-base" to="/">Accueil</NavLink>
          <NavLink className="btn btn-ghost text-base" to="/memories">Voir les souvenirs</NavLink>
          <NavLink className="btn btn-ghost text-base" to="/memories/create">Partager un souvenir</NavLink>
        </div>
        {/* Champs de recherche version desktop*/}
        <div className='searchbar'>
          <input
            type="text"
            placeholder="Rechercher..."
            className="search-input"
          />
        </div>
      </div>
    </div>
  );
}
