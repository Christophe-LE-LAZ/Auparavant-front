import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

// Création d'un wrapper permettant de rediriger l'utilisateur 
// vers la page d'accueil s'il vient de se connecter

interface PageProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PageProps) {
  const isLogged = useAppSelector((state) => state.user.logged);

  if (isLogged) {
    return <Navigate to="/" />;
  }

  return children;
}
