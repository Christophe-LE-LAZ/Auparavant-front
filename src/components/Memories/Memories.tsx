import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Card from '../../components/Card/Card';
import { clearMessage } from '../../store/messageReducer';
import { fetchMemories } from '../../store/memoriesReducer';
import YearSlider from '../YearSlider/YearSlider';
import {
  resetFilters,
  setArea,
  setCity,
  setDepartment,
  setType,
} from '../../store/filterReducer';

const Memories = () => {
  const dispatch = useAppDispatch();

  // Récupération des souvenirs depuis l'API
  useEffect(() => {
    dispatch(fetchMemories());
  }, []);

  // Récupération des valeurs du state
  const memoriesList = useAppSelector((state) => state.memories.list);
  const { action_done, message } = useAppSelector((state) => state.message);
  const filters = useAppSelector((state) => state.filter);
  const { area, department, city, type } = useAppSelector(
    (state) => state.filter
  );

  // Liste des régions représentées dans les souvenirs
  const areaList: string[] = [];
  memoriesList.forEach((memory) => {
    if (!areaList.includes(memory.location.area)) {
      areaList.push(memory.location.area);
    }
  });

  // Liste des départements représentées dans les souvenirs
  const departmentList: string[] = [];
  memoriesList.forEach((memory) => {
    if (!departmentList.includes(memory.location.department)) {
      departmentList.push(memory.location.department);
    }
  });

  // Liste des villes représentées dans les souvenirs
  const cityList: string[] = [];
  memoriesList.forEach((memory) => {
    if (!cityList.includes(memory.location.city)) {
      cityList.push(memory.location.city);
    }
  });

  // Liste des types de lieu représentées dans les souvenirs
  const typeList: string[] = [];
  memoriesList.forEach((memory) => {
    if (!typeList.includes(memory.place.type)) {
      typeList.push(memory.place.type);
    }
  });

  // Fonctions de gestion des changements d'options dans les selects des filtres

  const handleChangeArea = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setArea(e.target.value));
  };

  const handleChangeDepartment = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setDepartment(e.target.value));
  };

  const handleChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCity(e.target.value));
  };

  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setType(e.target.value));
  };

  // Données filtrées

  const filteredList = memoriesList.filter((memory) => {
    return (
      (filters.area === '' || memory.location.area === filters.area) &&
      (filters.department === '' ||
        memory.location.department === filters.department) &&
      (filters.city === '' || memory.location.city === filters.city) &&
      (filters.type === '' || memory.place.type === filters.type)
    );
  });
  console.log(filteredList);

  // Fonction de réinitialisation du filtre
  const handleClickReset = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch(resetFilters());
  };

  // Gestion de l'affichage du message de confirmation de suppression
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (action_done) {
      setShowSuccess(true);
    }
  }, []);

  const handleOK = () => {
    setShowSuccess(false);
    dispatch(clearMessage());
  };

  return (
    <div className="flex flex-col items-center">
      {/* Affichage d'un message si l'utilisateur vient juste de supprimer un souvenir */}
      {showSuccess && (
        <div
          role="alert"
          className="flex alert alert-success text-sm max-w-sm justify-between mb-10"
        >
          <span>{message}</span>
          <button
            className="text-sm bg-white font-bold py-1 px-2 rounded"
            onClick={handleOK}
          >
            OK
          </button>
        </div>
      )}

      <div>
        {/* Responsive drawer avec filtres + contenu de la page  */}
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Titre et bouton permettant l'ouverture du drawer en version mobile */}
            <div className="flex w-full justify-between items-center lg:justify-center lg:mb-5">
              <div className="w-1/5 lg:hidden"></div>
              <h2 className="w-3/5 text-center text-2xl">
                Liste des souvenirs
              </h2>
              <label
                htmlFor="my-drawer-2"
                className="btn drawer-button w-1/5 lg:hidden"
              >
                Filtrer
              </label>
            </div>
            {/* Card */}
            <ul className="flex flex-wrap my-5">
              {filteredList.map((memory) => (
                <li className="mx-auto" key={memory.id}>
                  <Card memory={memory} />
                </li>
              ))}
            </ul>
          </div>
          {/* Drawer */}
          <div className="drawer-side z-50">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="p-8 w-80 min-h-full bg-base-200 text-base-content">
              <label className="text-lg">Filtrer par localisation</label>
              {/* Select Région */}
              <select
                className="select select-bordered w-full my-2 max-w-xs"
                onChange={handleChangeArea}
                value={area}
              >
                <option value={''}>Choisissez une région</option>
                {areaList.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              {/* Select Département */}
              <select
                className="select select-bordered w-full my-2 max-w-xs"
                onChange={handleChangeDepartment}
                value={department}
              >
                <option value={''}>Choisissez un département</option>
                {departmentList.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
              {/* Select Ville */}
              <select
                className="select select-bordered w-full mt-2 mb-8 max-w-xs"
                onChange={handleChangeCity}
                value={city}
              >
                <option value={''}>Choisissez une ville</option>
                {cityList.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <label className="text-lg">Filtrer par type de lieu</label>
              {/* Select type de lieu */}
              <select
                className="select select-bordered w-full mt-2 mb-8 max-w-xs"
                onChange={handleChangeType}
                value={type}
              >
                <option value={''}>Choisissez un type de lieu</option>
                {typeList.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <label className="text-lg">Filtrer par période</label>
              {/* Double range slider année */}
              <YearSlider />
              <div className="flex flex-col items-center">
                <label
                  htmlFor="my-drawer-2"
                  className="btn drawer-button bg-base-300 mt-10 mb-3 lg:hidden "
                >
                  Afficher les souvenirs
                </label>
                <button
                  className="btn bg-base-300 lg:mt-10"
                  onClick={handleClickReset}
                >
                  Réinitialiser le filtre
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memories;
