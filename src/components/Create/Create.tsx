import React, { useEffect, useState } from 'react';
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
  createMemoryWithLocation,
  createMemoryWithoutLocation,
  uploadMainPicture,
} from '../../store/createMemoryReducer';
import Map from '../Map/Map';
import { useNavigate } from 'react-router-dom';
import { setMessage } from '../../store/messageReducer';

export default function Create() {
  // Lecture des states du reducer Memory
  const {
    area,
    department,
    district,
    street,
    city,
    zipcode,
    latitude,
    longitude,
  } = useAppSelector((state) => state.createMemory.location);
  const existingLocation = useAppSelector(
    (state) => state.createMemory.existingLocation
  );

  const locationToCreate = useAppSelector(
    (state) => state.createMemory.locationToCreate
  );

  const { error, loading, just_created, memoryId } = useAppSelector(
    (state) => state.createMemory
  );

  // Caractéristiques des inputs à mapper
  const memoryInputs = [
    {
      label: 'Titre du souvenir',
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      label: 'Description du souvenir',
      name: 'content',
      type: 'text',
      required: true,
    },
    {
      label: 'Date du souvenir',
      name: 'picture_date',
      type: 'date',
      required: true,
    },
  ];

  const photoInputs = [
    {
      label: 'Photographie principale',
      name: 'main_picture',
      type: 'file',
      required: true,
    },
    {
      label: 'Photographie supplémentaire',
      name: 'additionnal_pictures',
      type: 'file',
      required: false,
    },
  ];

  const placeInputs = [
    {
      label: "Nom de l'endroit",
      name: 'name',
      type: 'text',
      required: false,
    },
    {
      label: "Type d'endroit",
      name: 'type',
      type: 'text',
      required: true,
    },
  ];

  const locationInputsLocToCreate = [
    {
      label: 'Région',
      name: 'area',
      required: true,
      value: area,
      readOnly: false,
      disabled: false,
    },
    {
      label: 'Département',
      name: 'department',
      required: true,
      value: department,
      readOnly: false,
      disabled: false,
    },
    {
      label: 'Quartier',
      name: 'district',
      type: 'text',
      required: false,
      value: district,
      readOnly: false,
      disabled: false,
    },
    {
      label: 'Adresse',
      name: 'street',
      type: 'text',
      required: true,
      value: street,
      readOnly: false,
      disabled: false,
    },
    {
      label: 'Ville',
      name: 'city',
      type: 'text',
      required: true,
      value: city,
      readOnly: false,
      disabled: false,
    },
    {
      label: 'Code postal',
      name: 'zipcode',
      type: 'number',
      required: true,
      value: zipcode,
      readOnly: false,
      disabled: false,
    },
    {
      label: 'Latitude',
      name: 'latitude',
      type: 'text',
      required: true,
      value: latitude,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'Longitude',
      name: 'longitude',
      type: 'text',
      required: true,
      value: longitude,
      readOnly: true,
      disabled: true,
    },
  ];

  const locationInputsExistingLoc = [
    {
      label: 'Région',
      name: 'area',
      required: true,
      value: area,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'Département',
      name: 'department',
      required: true,
      value: department,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'Quartier',
      name: 'district',
      type: 'text',
      required: false,
      value: district,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'Adresse',
      name: 'street',
      type: 'text',
      required: true,
      value: street,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'Ville',
      name: 'city',
      type: 'text',
      required: true,
      value: city,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'Code postal',
      name: 'zipcode',
      type: 'number',
      required: true,
      value: zipcode,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'Latitude',
      name: 'latitude',
      type: 'text',
      required: true,
      value: latitude,
      readOnly: true,
      disabled: true,
    },
    {
      label: 'Longitude',
      name: 'longitude',
      type: 'text',
      required: true,
      value: longitude,
      readOnly: true,
      disabled: true,
    },
  ];

  const dispatch = useAppDispatch();

  // Envoi des valeurs entrées dans la partie Souvenir vers le state
  const handleBlurMemory = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValueM = e.target.value as string & (string[] | undefined);
    const inputNameM = e.target.name as TInputNameMemory;
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

  // TODO : gestion de l'upload d'images 
  const [image, setImage] = useState({} as File);

  const handleFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
    const picture = e.target.files[0];
    setImage(picture)
    }
  }
  console.log(image);

  // Dispatch pour la création d'un souvenir + place + location
  const handleSubmitLocationToCreate = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    dispatch(createMemoryWithLocation());
  };

  // Dispatch pour la création d'un souvenir + place
  const handleSubmitExistingLocation = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    dispatch(createMemoryWithoutLocation());
  };

  // Si le souvenir a été créé avec succès, enregistrement d'un message et redirection vers la liste
  const navigate = useNavigate();
  useEffect(() => {
    if (just_created) {
      dispatch(setMessage('Votre souvenir a été créé avec succès.'));
      navigate(`/memories/${memoryId}`);
    }
  }, [just_created]);

  return (
    <div>
      <h2 className="text-center text-2xl">Partager un souvenir</h2>
      <p className="text-center text-xs mt-5">* champs obligatoires</p>
      <p className="text-center text-xs mt-5">
        Si un pointeur est déjà présent sur la carte à l'emplacement de votre
        souvenir, cliquez dessus : sa localisation sera pré-remplie.{' '}
      </p>
      <p className="text-center text-xs">
        Dans le cas contraire, cliquez sur la carte : seules les coordonnées
        géographiques seront pré-remplies.
      </p>
      {/* Carte  */}
      <div>
        <Map />
      </div>

      {/* Formulaire pour une location existante */}
      {existingLocation && (
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmitExistingLocation}
        >
          <div className="sm:flex gap-6">
            <div>
              {/* Le souvenir */}
              <fieldset className="mt-5 p-5 border rounded-lg">
                <legend className="text-lg">Votre souvenir</legend>
                {memoryInputs.map(({ label, name, type, required }) => (
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
                      onBlur={handleBlurMemory}
                    />
                  </label>
                ))}
              </fieldset>

              {/* Le lieu */}
              <fieldset className="mt-5 p-5 border rounded-lg">
                <legend className="text-lg">Le lieu</legend>
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
                      onBlur={handleBlurPlace}
                    />
                  </label>
                ))}
              </fieldset>

              {/* Les photos */}
              <fieldset className="mt-5 p-5 border rounded-lg">
                <legend className="text-lg">Les photographies</legend>
                {photoInputs.map(({ label, name, type, required }) => (
                  <label key={name} className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">
                        {label} {required && '*'}{' '}
                      </span>
                    </div>
                    <input
                      type={type}
                      className="file-input file-input-bordered w-full max-w-xs"
                      name={name}
                      required={required}
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                ))}
              </fieldset>
            </div>

            {/* Sa localisation */}
            <fieldset className="mt-5 p-5 border rounded-lg">
              <legend className="text-lg">La localisation</legend>
              {locationInputsExistingLoc.map(
                ({
                  label,
                  name,
                  type,
                  value,
                  required,
                  readOnly,
                  disabled,
                }) => (
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
                      value={value}
                      readOnly={readOnly}
                      disabled={disabled}
                    />
                  </label>
                )
              )}
            </fieldset>
          </div>

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
      )}

      {/* Formulaire pour une location à créer */}
      {locationToCreate && (
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmitLocationToCreate}
        >
          <div className="sm:flex gap-6">
            <div>
              {/* Le souvenir */}
              <fieldset className="mt-5 p-5 border rounded-lg">
                <legend className="text-lg">Votre souvenir</legend>
                {memoryInputs.map(({ label, name, type, required }) => (
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
                      onBlur={handleBlurMemory}
                    />
                  </label>
                ))}
              </fieldset>

              {/* Le lieu */}
              <fieldset className="mt-5 p-5 border rounded-lg">
                <legend className="text-lg">Le lieu</legend>
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
                      onBlur={handleBlurPlace}
                    />
                  </label>
                ))}
              </fieldset>

              {/* Les photos */}
              <fieldset className="mt-5 p-5 border rounded-lg">
                <legend className="text-lg">Les photographies</legend>
                {photoInputs.map(({ label, name, type, required }) => (
                  <label key={name} className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">
                        {label} {required && '*'}{' '}
                      </span>
                    </div>
                    <input
                      type={type}
                      className="file-input file-input-bordered w-full max-w-xs"
                      name={name}
                      required={required}
                      onBlur={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                ))}
              </fieldset>
            </div>

            {/* Sa localisation */}
            <fieldset className="mt-5 p-5 border rounded-lg">
              <legend className="text-lg">Sa localisation</legend>
              {locationInputsLocToCreate.map(
                ({
                  label,
                  name,
                  type,
                  value,
                  required,
                  readOnly,
                  disabled,
                }) => (
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
                      onBlur={handleBlurLocation}
                      defaultValue={value}
                      readOnly={readOnly}
                      disabled={disabled}
                    />
                  </label>
                )
              )}
            </fieldset>
          </div>
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
      )}

      {/* Affichage d'un message d'erreur */}
      {error && (
        <div role="alert" className="alert alert-error max-w-xs">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
