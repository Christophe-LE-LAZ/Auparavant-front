import './Navbar.scss';
import { NavLink } from 'react-router-dom';
import Home from '../../assets/Home.png';
import See from '../../assets/See.png';
import Share from '../../assets/Share.png';

export default function Navbar() {
  return (
    <div>
      {/* Navbar version Desktop */}
      <div className="navbar justify-evenly">
        <NavLink
          className="h-12 rounded-lg p-3 hover:bg-gray-200 hidden sm:flex"
          to="/"
        >
          Accueil
        </NavLink>
        <NavLink
          className="h-12 rounded-lg p-3 hover:bg-gray-200 hidden sm:flex"
          to="/memories"
        >
          <p>Voir les souvenirs</p>
        </NavLink>
        <NavLink
          className="h-12 rounded-lg p-3 hover:bg-gray-200 hidden sm:flex"
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
      <div className="flex flex-row justify-evenly w-screen fixed bottom-0 left-0 p-3 border-t sm:hidden">
        <NavLink className="flex flex-col items-center w-20" to="/">
          <img alt="logo-voir" src={Home} className="w-12" />
          <p className="text-center">Accueil</p>
        </NavLink>
        <NavLink className="flex flex-col items-center w-20" to="/memories">
          <img alt="logo-voir" src={See} className="w-12" />
          <p className="text-center">Voir</p>
        </NavLink>
        <NavLink
          className="flex flex-col items-center w-20"
          to="/memories/create"
        >
          <img alt="logo-voir" src={Share} className="w-12" />
          <p className="text-center">Partager</p>
        </NavLink>
      </div>
    </div>
  );
}
