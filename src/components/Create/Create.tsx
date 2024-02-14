import React from 'react';
import { useAppDispatch } from '../../hooks';
import { ChangeEvent } from 'react';
import { TInputNameMemo } from '../../types/inputName';

export default function Create() {
  const memoryInputs = [
    { label: 'Titre du souvenir', name: 'memory.title', required: true },
    {
      label: 'Description du souvenir',
      name: 'memory.content',
      required: true,
    },
    { label: 'Date du souvenir', name: 'memory.picture_date', required: true },
  ];
  const photosInputs = [
    {
      label: 'Photographie principale',
      name: 'memory.main_picture',
      required: true,
    },
    {
      label: 'Photographies supplémentaires',
      name: 'memory.additionnal_pictures',
      required: false,
    },
  ];

  const placeInputs = [
    { label: "Nom de l'endroit", name: 'place.name', required: true },
    { label: "Type d'endroit", name: 'place.type', required: true },
  ];

  const locationInputs = [
    { label: 'Région', name: 'location.area', required: true },
    { label: 'Département', name: 'location.department', required: true },
    { label: 'Quartier', name: 'location.district', required: false },
    { label: 'Adresse', name: 'location.street', required: true },
    { label: 'Ville', name: 'location.city', required: true },
    { label: 'Code postal', name: 'location.zipcode', required: true },
    { label: 'Latitude', name: 'location.latitude', required: true },
    { label: 'Longitude', name: 'location.longitude', required: true },
  ];

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value as string;
    const inputName = e.target.name as TInputNameMemo;
    dispatch(changeFieldState({ inputValue, inputName }));
  };

  return (
    <div>
      <h2 className="text-center text-2xl">Partager un souvenir</h2>

      <form className="">
        <fieldset className="mt-10">
          <legend className="text-lg mb-5">Votre souvenir</legend>
          {memoryInputs.map(({ label, name, required }) => (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">
                  {label} {required && '*'}{' '}
                </span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                name={name}
                required={required}
              />
            </label>
          ))}
        </fieldset>

        <fieldset className="mt-10">
          <legend className="text-lg mb-5">Les photographies</legend>
          {photosInputs.map(({ label, name, required }) => (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">
                  {label} {required && '*'}
                </span>
              </div>
              <input
                type="file"
                className="file-input file-input-ghost w-full max-w-xs"
                name={name}
                required={required}
              />
            </label>
          ))}
        </fieldset>

        <fieldset className="mt-10">
          <legend className="text-lg mb-5">Le lieu</legend>
          {placeInputs.map(({ label, name, required }) => (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">
                  {label} {required && '*'}
                </span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                name={name}
                required={required}
              />
            </label>
          ))}
        </fieldset>

        <fieldset className="mt-10">
          <legend className="text-lg mb-5">Sa localisation</legend>
          {locationInputs.map(({ label, name, required }) => (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">
                  {label}
                  {required && '*'}
                </span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                name={name}
                required={required}
              />
            </label>
          ))}
        </fieldset>

        {/* Bouton de soumission du formulaire */}
        <button
          type="submit"
          className="h-12 rounded-lg p-3 bg-base-200 text-sm mt-5 mb-10"
        >
          Soumettre
        </button>
      </form>
    </div>
  );
}
