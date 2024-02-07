import React from 'react';
import './Navbar.scss';

export default function Navbar() {
  return (
    <div className="navbar bg-white">
      <div className="flex-1 justify-center">
        <a className="btn btn-ghost text-base">Accueil</a>
        <a className="btn btn-ghost text-base">Voir les souvenirs</a>
        <a className="btn btn-ghost text-base">Partager un souvenir</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a>
                Mon profil
              </a>
            </li>
            <li>
              <a>Mes contributions</a>
            </li>
            <li>
              <a>Déconnexion</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
