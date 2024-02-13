import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFieldState, login } from '../../store/user';
import { TInputName } from '../../types/inputName';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const logged = useAppSelector((state) => state.user.logged);

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value as string;
    const inputName = e.target.name as TInputName;
    dispatch(changeFieldState({ inputValue, inputName }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login());
  };

  // Lecture des states du User reducer
  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);
  const email = useAppSelector((state) => state.user.credentials.username);
  const password = useAppSelector((state) => state.user.credentials.password);

  return (
    <div className="flex flex-col items-center m-10 gap-5 sm:m-20">
      <h2 className="text-xl">Connectez-vous</h2>
      <form onSubmit={handleSubmit}>
        {/* Champ Email */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">E-mail</span>
          </div>
          <input
            type="text"
            placeholder="Entrez votre email"
            className="input input-bordered w-full max-w-xs"
            onChange={handleChange}
            value={email}
            name="username"
          />
        </label>
        {/* Champ Password */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Mot de passe</span>
          </div>
          <input
            type="text"
            placeholder="Entrez votre mot de passe"
            className="input input-bordered w-full max-w-xs"
            onChange={handleChange}
            value={password}
            name="password"
          />
        </label>
        <div className="flex content-center mt-6">
          {/* Bouton de soumission du formulaire */}
          <button
            type="submit"
            className="h-12 rounded-lg p-3 bg-base-200 text-sm"
          >
            Soumettre
          </button>
          {/* Affichage d'un loader pendant le loading */}
          {loading && (
            <span className="loading loading-spinner loading-md ml-5"></span>
          )}
        </div>
      </form>
      {/* Affichage d'un message d'erreur */}
      {error && (
        <div role="alert" className="alert alert-error max-w-xs">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
