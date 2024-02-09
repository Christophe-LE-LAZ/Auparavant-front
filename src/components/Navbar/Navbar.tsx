import './Navbar.scss';
import { NavLink } from 'react-router-dom';
import Home from '../../assets/Home.png';
import See from '../../assets/See.png';
import Share from '../../assets/Share.png';

export default function Navbar() {
  return (
    <nav className="flex justify-center">
      {/* Navbar version Desktop */}
      <div className="navbar justify-evenly sm:max-w-5xl">
        <NavLink
          className="h-12 rounded-lg p-3 hover:bg-base-200 hidden sm:flex"
          to="/"
        >
          Accueil
        </NavLink>
        <NavLink
          className="h-12 rounded-lg p-3 hover:bg-base-200 hidden sm:flex"
          to="/memories"
        >
          <p>Voir les souvenirs</p>
        </NavLink>
        <NavLink
          className="h-12 rounded-lg p-3 hover:bg-base-200 hidden sm:flex"
          to="/memories/create"
        >
          Partager un souvenir
        </NavLink>
        {/* Barre de recherche */}
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Rechercher..."
            className="input input-bordered w-screen  sm:w-40 md:w-auto"
          />
        </div>
      </div>

      {/* Navbar version mobile  */}
      {/* Position fixed, z-index 50 afin de passer au dessus du reste du contenu*/}
      <div className="flex flex-row justify-evenly w-screen h-20 fixed bottom-0 left-0 z-50 p-3 bg-white border-t sm:hidden">
        <NavLink className="flex flex-col items-center w-20" to="/">
          <img alt="logo-voir" src={Home} className="w-9" />
          <p className="text-center">Accueil</p>
        </NavLink>
        <NavLink className="flex flex-col items-center w-20" to="/memories">
          <img alt="logo-voir" src={See} className="w-9" />
          <p className="text-center">Voir</p>
        </NavLink>
        <NavLink
          className="flex flex-col items-center w-20"
          to="/memories/create"
        >
          <img alt="logo-voir" src={Share} className="w-9" />
          <p className="text-center">Partager</p>
        </NavLink>
      </div>
    </nav>
  );
}
