import React from 'react';
import Navbar from '../Navbar/Navbar';
import Logo from '../../assets/Logo.png';
import Avatar from '../../assets/Avatar.png';
import './Header.scss';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <div className="header">
        {/* Logo avec lien vers la page d'accueil */}
        <Link to="/">
          <img alt="Logo" src={Logo} className="logo" />
        </Link>
        {/* Avatar d'utilisateur connecté avec menu déroulant */}
        <div className="dropdown dropdown-end fixed right-2 top-2">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Avatar" src={Avatar} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile">Mon profil</Link>
            </li>
            <li>
              <Link to="/contributions">Mes contributions</Link>
            </li>
            <li>
              <a>Déconnexion</a>
            </li>
          </ul>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
