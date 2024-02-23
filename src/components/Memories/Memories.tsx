import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Card from '../../components/Card/Card';
import { clearMessage } from '../../store/messageReducer';
import { fetchMemories } from '../../store/memoriesReducer';

const Memories = () => {
  const dispatch = useAppDispatch();

  // Récupération des souvenirs depuis l'API
  useEffect(() => {
    dispatch(fetchMemories());
  }, []);

  // Récupération des valeurs du state
  const memoriesList = useAppSelector((state) => state.memories.list);
  const { action_done, message } = useAppSelector((state) => state.message);

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
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              <label className="text-lg my-4">Filtrer par localisation</label>
              {/* Select Région */}
              <li className="my-2">
                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Région
                  </option>
                  <option>Région 1</option>
                  <option>Région 2</option>
                </select>
              </li>
              {/* Select Département */}
              <li className="my-2">
                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Département
                  </option>
                  <option>Dep 1</option>
                  <option>Dep 2</option>
                </select>
              </li>
              {/* Select Ville */}
              <li className="my-2">
                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Ville
                  </option>
                  <option>Ville 1</option>
                  <option>Ville 2</option>
                </select>
              </li>
              <label className="text-lg my-4">Filtrer par type de lieu</label>
              {/* Select type de lieu */}
              <li className="my-2">
                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Type
                  </option>
                  <option>Type 1</option>
                  <option>Type 2</option>
                </select>
              </li>
              <label className="text-lg my-4">Filtrer par période</label>
              {/* Double range slider année */}
              <li className="my-2">
                <h4>
                  Année<span>Range</span>
                </h4>
                <div className=''>1700 - 2024</div>
                <small>Période courante : 100 ans</small>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memories;
