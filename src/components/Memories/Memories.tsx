import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Card from '../../components/Card/Card';
import { clearMessage } from '../../store/messageReducer';
import { fetchMemories } from '../../store/memoriesReducer';
import YearSlider from '../YearSlider/YearSlider';

const Memories = () => {
  const dispatch = useAppDispatch();

  // Récupération des souvenirs depuis l'API
  useEffect(() => {
    dispatch(fetchMemories());
  }, []);

  // Récupération des valeurs du state
  const memoriesList = useAppSelector((state) => state.memories.list);
  const { action_done, message } = useAppSelector((state) => state.message);

  // Liste des régions représentées dans les souvenirs
  const areaList : string[] = [];
  memoriesList.forEach(memory => {
    if (!areaList.includes(memory.location.area)) {
      areaList.push(memory.location.area)
    }
  });

  // Liste des départements représentées dans les souvenirs
  const departmentList : string[] = [];
  memoriesList.forEach(memory => {
    if (!departmentList.includes(memory.location.department)) {
      departmentList.push(memory.location.department)
    }
  });

  // Liste des villes représentées dans les souvenirs
  const cityList : string[] = [];
  memoriesList.forEach(memory => {
    if (!cityList.includes(memory.location.city)) {
      cityList.push(memory.location.city)
    }
  });

  // Liste des types de lieu représentées dans les souvenirs
  const typeList : string[] = [];
  memoriesList.forEach(memory => {
    if (!typeList.includes(memory.place.type)) {
      typeList.push(memory.place.type)
    }
  });

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
        {/* Responsive drawer avec filtres  */}
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            <div className="flex justify-between items-center w-11/12 mb-5 lg:justify-center">
              <div className="w-1/5 lg:hidden"></div>
              <h2 className="w-3/5 text-center text-2xl">
                Liste des souvenirs
              </h2>
              {/* Bouton permettant l'ouverture du drawer en version mobile */}
              <label
                htmlFor="my-drawer-2"
                className="btn drawer-button w-1/5 lg:hidden"
              >
                Filtrer
              </label>
            </div>
            {/* Card */}
            <ul className="flex flex-wrap my-5">
              {memoriesList.map((memory) => (
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
            <div className="p-4 w-80 min-h-full bg-base-200 text-base-content">
              <label className="text-lg my-">Filtrer par localisation</label>
              {/* Select Région */}
                <select className="select select-bordered w-full my-2 max-w-xs">
                  <option selected>
                    Région
                  </option>
                  {areaList.map((area) => (
                    <option key={area}>{area}</option>
                  ))}
                </select>
              {/* Select Département */}
                <select className="select select-bordered w-full my-2 max-w-xs">
                  <option selected>
                    Département
                  </option>
                  {departmentList.map((department) => (
                    <option key={department}>{department}</option>
                  ))}
                </select>
              {/* Select Ville */}
                <select className="select select-bordered w-full my-2 max-w-xs">
                  <option selected>
                    Ville
                  </option>
                  {cityList.map((city) => (
                    <option key={city}>{city}</option>
                  ))}
                </select>
              <label className="text-lg my-4">Filtrer par type de lieu</label>
              {/* Select type de lieu */}
                <select className="select select-bordered w-full my-2 max-w-xs">
                  <option selected>
                    Type
                  </option>
                  {typeList.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              <label className="text-lg my-4">Filtrer par période</label>
              {/* Double range slider année */}
                <YearSlider />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memories;
