import React from 'react';
import './Navbar.scss';
import { NavLink } from 'react-router-dom';
import Home from '../../assets/Home.png';
import See from '../../assets/See.png';
import Share from '../../assets/Share.png';

export default function Navbar() {
  return (
    <div>
      <div className="flex">
        <div className="navbar justify-center">
          <NavLink className="btn btn-ghost text-base hidden sm:flex" to="/">
            Accueil
          </NavLink>
          <NavLink
            className="btn btn-ghost text-base hidden sm:flex"
            to="/memories"
          >
            Voir les souvenirs
          </NavLink>
          <NavLink
            className="btn btn-ghost text-base hidden sm:flex"
            to="/memories/create"
          >
            Partager un souvenir
          </NavLink>
          <div className="form-control">
            <input
              type="text"
              placeholder="Rechercher..."
              className="input input-bordered w-screen sm:w-auto"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-evenly w-screen fixed bottom-0 left-0 p-3 border-t sm:hidden">
        <NavLink className="flex flex-col justify-center" to="/">
          <img alt="logo-voir" src={Home} className="w-20" />
          <p className="text-center">Accueil</p>
        </NavLink>
        <NavLink className="flex flex-col justify-center" to="/memories">
          <img alt="logo-voir" src={See} className="w-20" />
          <p className="text-center">Voir</p>
        </NavLink>
        <NavLink className="flex flex-col justify-center" to="/memories/create">
          <img alt="logo-voir" src={Share} className="w-20" />
          <p className="text-center">Partager</p>
        </NavLink>
      </div>
    </div>
  );
}
