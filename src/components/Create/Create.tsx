import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ChangeEvent } from 'react';
import {
  TInputNameLocation,
  TInputNameMemory,
  TInputNamePlace,
} from '../../types/inputName';
import {
  changeFieldStateMemory,
  changeFieldStatePlace,
  changeFieldStateLocation,
  createMemory,
} from '../../store/memory';

export default function Create() {
  // Lecture des states du reducer Memory
  const { title, content, picture_date, main_picture, additionnal_pictures } =
    useAppSelector((state) => state.memory.memoryData.memory);
  const { name, type } = useAppSelector(
    (state) => state.memory.memoryData.place
  );
  const {
    area,
    department,
    district,
    street,
    city,
    zipcode,
    latitude,
    longitude,
  } = useAppSelector((state) => state.memory.memoryData.location);
  const { error, loading } = useAppSelector((state) => state.memory);

  // Caractéristiques des inputs à mapper
  const memoryInputs = [
    {
      label: 'Titre du souvenir',
      name: 'title',
      type: 'text',
      required: true,
      value: title,
    },
    {
      label: 'Description du souvenir',
      name: 'content',
      type: 'text',
      required: true,
      value: content,
    },
    {
      label: 'Date du souvenir',
      name: 'picture_date',
      type: 'date',
      required: true,
      value: picture_date.substring(0, 10),
    },
    {
      label: 'Photographie principale',
      name: 'main_picture',
      type: 'url',
      placeholder: 'URL',
      required: true,
      value: main_picture,
    },
    {
      label: 'Photographie supplémentaire',
      name: 'additionnal_pictures',
      type: 'url',
      placeholder: 'URL',
      required: false,
    },
  ];

  const placeInputs = [
    {
      label: "Nom de l'endroit",
      name: 'name',
      type: 'text',
      required: false,
      value: name,
    },
    {
      label: "Type d'endroit",
      name: 'type',
      type: 'text',
      required: true,
      value: type,
    },
  ];

  const locationInputs = [
    { label: 'Région', name: 'area', required: true, value: area },
    {
      label: 'Département',
      name: 'department',
      required: true,
      value: department,
    },
    {
      label: 'Quartier',
      name: 'district',
      type: 'text',
      required: false,
      value: district,
    },
    {
      label: 'Adresse',
      name: 'street',
      type: 'text',
      required: true,
      value: street,
    },
    {
      label: 'Ville',
      name: 'city',
      type: 'text',
      required: true,
      value: city,
    },
    {
      label: 'Code postal',
      name: 'zipcode',
      type: 'number',
      required: true,
      value: zipcode,
    },
    {
      label: 'Latitude',
      name: 'latitude',
      type: 'text',
      required: true,
      value: latitude,
    },
    {
      label: 'Longitude',
      name: 'longitude',
      type: 'text',
      required: true,
      value: longitude,
    },
  ];

  const dispatch = useAppDispatch();

  // Envoi des valeurs entrées dans la partie Souvenir vers le state
  const handleBlurMemory = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValueM = e.target.value as string & (string[] | undefined);
    const inputNameM = e.target.name as TInputNameMemory;
    console.log(inputValueM);
    dispatch(changeFieldStateMemory({ inputValueM, inputNameM }));
  };

  // Envoi des valeurs entrées dans la partie Lieu vers le state
  const handleBlurPlace = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValueP = e.target.value as string;
    const inputNameP = e.target.name as TInputNamePlace;
    dispatch(changeFieldStatePlace({ inputValueP, inputNameP }));
  };

  // Envoi des valeurs entrées dans la partie Localisation vers le state
  const handleBlurLocation = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValueL = e.target.value as string & (number | undefined);
    const inputNameL = e.target.name as TInputNameLocation;
    dispatch(changeFieldStateLocation({ inputValueL, inputNameL }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createMemory());
  };

  return (
    <div>
      <h2 className="text-center text-2xl">Partager un souvenir</h2>
      <p className="text-center text-xs mt-5">* champs obligatoires</p>

      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        {/* Le souvenir */}
        <fieldset className="mt-10 p-5 border rounded-lg">
          <legend className="text-lg mb-5">Votre souvenir</legend>
          {memoryInputs.map(
            ({ label, name, type, value, placeholder, required }) => (
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
                  defaultValue={value}
                  placeholder={placeholder}
                  onBlur={handleBlurMemory}
                />
              </label>
            )
          )}
        </fieldset>

        {/* Le lieu */}
        <fieldset className="mt-10 p-5 border rounded-lg">
          <legend className="text-lg mb-5">Le lieu</legend>
          {placeInputs.map(({ label, name, type, value, required }) => (
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
                defaultValue={value}
                onBlur={handleBlurPlace}
              />
            </label>
          ))}
        </fieldset>

        {/* Sa localisation */}
        <fieldset className="mt-10 p-5 border rounded-lg">
          <legend className="text-lg mb-5">Sa localisation</legend>
          {locationInputs.map(({ label, name, type, value, required }) => (
            <label key={name} className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">
                  {label}
                  {required && '*'}
                </span>
              </div>
              <input
                type={type}
                className="input input-bordered w-full max-w-xs"
                name={name}
                required={required}
                defaultValue={value}
                onBlur={handleBlurLocation}
              />
            </label>
          ))}
        </fieldset>

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
