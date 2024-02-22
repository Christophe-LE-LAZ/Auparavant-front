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

  const handleOK= () => {
    setShowSuccess(false);
    dispatch(clearMessage());
  };

  return (
    <div className="flex flex-col items-center">
      {/* Affichage d'un message si l'utilisateur vient juste de supprimer un souvenir */}
      {showSuccess && (
        <div role="alert" className="flex alert alert-success text-sm max-w-sm justify-between mb-10">
          <span>{message}</span>
          <button
                className="text-sm bg-white font-bold py-1 px-2 rounded"
                onClick={handleOK}
              >
                OK
              </button>
        </div>
      )}

      <h2 className="text-center text-2xl pb-10">Liste des souvenirs</h2>
      <div>
        <ul className="flex flex-wrap">
          {memoriesList.map((memory) => (
            <li className="mx-auto" key={memory.id}>
              <Card memory={memory} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Memories;
