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
            {/* Page content here */}

            <div className="flex justify-between items-center w-11/12 mb-5 lg:justify-center">
              <div className='w-1/5 lg:hidden'></div>
              <h2 className="w-3/5 text-center text-2xl">Liste des souvenirs</h2>
              <label
                htmlFor="my-drawer-2"
                className="btn drawer-button w-1/5 lg:hidden"
              >
                Filtrer
              </label>
            </div>

            <ul className="flex flex-wrap my-5">
              {memoriesList.map((memory) => (
                <li className="mx-auto" key={memory.id}>
                  <Card memory={memory} />
                </li>
              ))}
            </ul>
          </div>
          <div className="drawer-side z-50">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memories;
