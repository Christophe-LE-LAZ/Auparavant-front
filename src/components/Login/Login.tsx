import React from 'react';
import { useAppSelector } from '../../hooks';

export default function Login() {
  const { email, password } = useAppSelector((state) => state.user.credentials);
  const pseudo = useAppSelector((state) => state.user.pseudo);
  const loggedMessage = `Bienvenue ${pseudo}`;
  const islogged = useAppSelector((state) => state.user.logged);

  return (
    <div className="flex flex-col items-center m-10 gap-5 sm:m-20">
      <h2 className="text-xl">Connectez-vous</h2>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">E-mail</span>
        </div>
        <input
          type="text"
          placeholder=""
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Mot de passe</span>
        </div>
        <input
          type="text"
          placeholder=""
          className="input input-bordered w-full max-w-xs"
        />
      </label>
    </div>
  );
}
