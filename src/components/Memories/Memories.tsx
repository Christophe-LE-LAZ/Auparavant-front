import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Card from '../../components/Card/Card';
import { fetchMemories } from '../../store/memoriesReducer';
import { clear } from '../../store/messageReducer';

const Memories = () => {
  
  const dispatch = useAppDispatch();
  // Appel de l'API lors du montage du composant
  useEffect(() => {
    dispatch(fetchMemories());
  }, []);

  // Récupération des valeurs du state
  const memoriesList = useAppSelector((state) => state.memories.list);

  return (
    <div className='flex flex-col items-center'>
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
