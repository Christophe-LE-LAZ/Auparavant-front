import { Link } from 'react-router-dom';
import { IDataCreated } from '../../types/memory';

interface Props {
  memory: IDataCreated;
}

export default function Card({ memory }: Props) {
  // Convertir la date en objet Date
  const memoryDate = new Date(memory.picture_date);
  // Formater la date pour afficher uniquement l'année
  const formattedDate = memoryDate.toLocaleString(undefined, {
    year: 'numeric',
  });

  return (
    <Link to={`/memories/${memory.id}`}>
      <div className="text-center mx-auto ">
        <div className="card bg-gray-100 shadow-xl mx-2 mb-10 w-96">
          <h2 className="text-lg font-bold lg:text-xl pt-4">{memory.title} </h2>
          <p></p>
          <h3 className="italic">
            {memory.location.city}, {formattedDate}
          </h3>
          <figure className="px-7 pt-4 max-h-72 w-auto">
            <img
              src={`https://admin.auparavant.fr/assets/pictures/${memory.main_picture}`}
              alt=""
              className="rounded-xl w-80 h-72"
            />
          </figure>
          <div className="card-body items-center text-center "></div>
        </div>
      </div>
    </Link>
  );
}
