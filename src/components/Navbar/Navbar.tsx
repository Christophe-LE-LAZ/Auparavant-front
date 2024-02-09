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
    </nav>
  );
}
