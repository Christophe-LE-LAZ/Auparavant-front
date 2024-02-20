import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import NotFound from '../NotFound/NotFound';
import Delete from '../../assets/Delete.png';
import Edit from '../../assets/Edit.png';
import { deleteMemory } from '../../store/memoryReducer';

const MemoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const memoriesList = useAppSelector((state) => state.memories.list);
  const userId = useAppSelector((state) => state.user.id);
  const memory = memoriesList.find((memory) => memory.id.toString() === id);
  const dispatch = useAppDispatch();

  if (!memory) {
    return <NotFound />;
  }

  // Convertir la date en objet Date
  const memoryDate = new Date(memory.picture_date);
  // Formater la date pour afficher sans les secondes
  const formattedDate = memoryDate.toLocaleString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // Gestion du click sur Edit
  const handleDelete = () => {
    const memoryID = memory.id
    console.log(memory.id);
    dispatch(deleteMemory(memoryID));
  };
  
  return (
    <>
      <div className="flex justify-between">
        <Link to="/memories" className="link ml-10">
          Retour à la liste des souvenirs
        </Link>
        <div className="flex mr-10 gap-4 ">
          {memory.user.id === userId && (
            <>
            <div className='btn btn-ghost btn-circle avatar'>
              <img alt="edit" src={Edit} className="w-10 rounded-full"/>
            </div>
            <div className='btn btn-ghost btn-circle avatar'>
              <img alt="delete" src={Delete} className="w-10 rounded-full" onClick={handleDelete} />
            </div>
            </>
          )}
        </div>
      </div>
      <div className="max-w-lg mx-auto">
        {/* Titre */}
        <h1 className="text-center text-xl font-bold lg:text-2xl pt-10 pb-5">
          {memory.title}{' '}
        </h1>
        {/* Image */}
        <div className="mx-8">
          <img src={memory.main_picture} alt="" className="rounded-xl" />
        </div>
        {/* Informations */}
        <div className="flex flex-col mt-8">
          {/* Partie "souvenir" */}
          <legend className="text-lg font-bold">Le souvenir</legend>
          <div className="px-5 py-2 border rounded-lg">
            <div className="text-left mt-2">
              <strong>Description :</strong> {memory.content}
            </div>
            <div className="text-left mt-2">
              <strong>Date de la photo :</strong> {formattedDate}
            </div>
            <div className="text-left mt-2">
              <strong>Ajouté par :</strong> {memory.user.firstname}{' '}
              {memory.user.lastname}
            </div>
          </div>
          {/* Partie "lieu" */}
          <legend className="text-lg font-bold mt-5">Le lieu</legend>
          <div className="px-5 py-2 border rounded-lg">
            <div className="text-left mt-2">
              <strong>Nom du lieu :</strong> {memory.place.name}
            </div>
            <div className="text-left mt-2">
              <strong>Type de lieu :</strong> {memory.place.type}
            </div>
          </div>
          {/* Partie "localisation" */}
          <legend className="text-lg font-bold mt-5">Sa localisation</legend>
          <div className="px-5 py-2 border rounded-lg mb-10">
            <div className="text-left mt-2">
              <strong>Région :</strong> {memory.location.area}
            </div>
            <div className="text-left mt-2">
              <strong>Département :</strong> {memory.location.department}
            </div>
            <div className="text-left mt-2">
              <strong>Quartier :</strong> {memory.location.district}
            </div>
            <div className="text-left mt-2">
              <strong>Adresse :</strong> {memory.location.street}
            </div>
            <div className="text-left mt-2">
              <strong>Code postal :</strong> {memory.location.zipcode}
            </div>
            <div className="text-left mt-2">
              <strong>Ville :</strong> {memory.location.city}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemoryPage;
