import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ChangeEvent } from 'react';
import { TInputNameMemo } from '../../types/inputName';
import { changeFieldState } from '../../store/memory';

export default function Create() {

// Lecture des states du User reducer
const title = useAppSelector((state) => state.memory.memory.title);
const content = useAppSelector((state) => state.memory.memory.content);
const pictureDate = useAppSelector((state) => state.memory.memory.picture_date);

// Caractéristiques des inputs à mapper
  const memoryInputs = [
    { label: 'Titre du souvenir', name: 'memory.title', type: 'text', required: true, value: title },
    {
      label: 'Description du souvenir',
      name: 'memory.content',
      type: 'text',
      required: true,
      value : content
    },
    { label: 'Date du souvenir', name: 'memory.picture_date', type : 'date', required: true, value: pictureDate },
  ];
  const photosInputs = [
    {
      label: 'Photographie principale',
      name: 'memory.main_picture',
      type: 'url',
      placeholder: 'URL',
      required: true,
    },
    {
      label: 'Photographie supplémentaire',
      name: 'memory.additionnal_pictures',
      type: 'url',
      placeholder: 'URL',
      required: false,
    },
  ];

  const placeInputs = [
    { label: "Nom de l'endroit", name: 'place.name', type: 'text', required: false },
    { label: "Type d'endroit", name: 'place.type', type: 'text', required: true },
  ];

  const locationInputs = [
    { label: 'Région', name: 'location.area', required: true },
    { label: 'Département', name: 'location.department', required: true },
    { label: 'Quartier', name: 'location.district', type: 'text', required: false },
    { label: 'Adresse', name: 'location.street',type: 'text', required: true },
    { label: 'Ville', name: 'location.city', type: 'text', required: true },
    { label: 'Code postal', name: 'location.zipcode', type:'number', required: true },
    { label: 'Latitude', name: 'location.latitude', type: 'text', required: true },
    { label: 'Longitude', name: 'location.longitude', type: 'text', required: true },
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
      <p className="text-center text-xs mt-5">* champs obligatoires</p>

      <form className="flex flex-col items-center">

        {/* Le souvenir */}
        <fieldset className="mt-10 p-5 border rounded-lg">
          <legend className="text-lg mb-5">Votre souvenir</legend>
          {memoryInputs.map(({ label, name, type, value, required }) => (
            <label key={name} className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">
                  {label} {required && '*'}{' '}
                </span>
              </div>
              <input
                type={type}
                className="input input-bordered w-full max-w-xs"
                name={name}
                required={required}
                value={value}
                onChange={handleChange}
              />
            </label>
          ))}
        </fieldset>

        {/* Les photographies */}
        <fieldset className="mt-10 p-5 border rounded-lg">
          <legend className="text-lg mb-5">Les photographies</legend>
          {photosInputs.map(({ label, name, type, placeholder, required }) => (
            <label key={name} className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">
                  {label} {required && '*'}
                </span>
              </div>
              <input
                type={type}
                className="input input-bordered w-full max-w-xs"
                placeholder={placeholder}
                name={name}
                required={required}
                onChange={handleChange}
              />
            </label>
          ))}
        </fieldset>

        {/* Le lieu */}
        <fieldset className="mt-10 p-5 border rounded-lg">
          <legend className="text-lg mb-5">Le lieu</legend>
          {placeInputs.map(({ label, name, type, required }) => (
            <label key={name} className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">
                  {label} {required && '*'}
                </span>
              </div>
              <input
                type={type}
                className="input input-bordered w-full max-w-xs"
                name={name}
                required={required}
                onChange={handleChange}
              />
            </label>
          ))}
        </fieldset>

        {/* Sa localisation */}
        <fieldset className="mt-10 p-5 border rounded-lg">
          <legend className="text-lg mb-5">Sa localisation</legend>
          {locationInputs.map(({ label, name, required }) => (
            <label key={name} className="form-control w-full max-w-xs">
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
                onChange={handleChange}
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
