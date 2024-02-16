import { useAppSelector } from '../../hooks';

export default function Profile() {
  const { firstname, email, lastname } = useAppSelector((state) => state.user);

  return (
    <div className=''>
      <div className="avatar flex flex-col mb-28 items-center ">
        <div className="w-24 rounded-full">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
        <button className="text-sm bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-4">
          Modifier
        </button>
        <h1 className='pt-12'>Bienvenue sur votre profil, {firstname}.</h1>
      </div>


      <div className='flex justify-between border-t-2 border-b-2 border-grey'>
        <div>
        <h2 className='pb-2'>Nom</h2>
        <p>{lastname}</p>
        </div>
        <div>
        <button className="text-sm bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-4">
          Modifier
        </button>
        </div>
      </div>
      <div className='flex justify-between border-t-2 border-b-2 border-grey'>
        <div>
        <h2 className='pb-2'>Prénom</h2>
        <p>{firstname}</p>
        </div>
        <div>
        <button className="text-sm bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-4">
          Modifier
        </button>
        </div>
      </div>
      <div className='flex justify-between border-t-2 border-b-2 border-grey'>
        <div>
        <h2 className='pb-2'>E-mail</h2>
        <p>{email}</p>
        </div>
        <div>
        <button className="text-sm bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-4">
          Modifier
        </button>
        </div>
      </div>
      <div className='flex justify-between border-t-2 border-b-2 border-grey'>
        <div>
        <h2 className='pb-2'>Mot de passe</h2>
        <p>******</p>
        </div>
        <div>
        <button className="text-sm bg-gray-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-4">
          Modifier 
        </button>
        </div>
      </div>
    </div>
  );
}
