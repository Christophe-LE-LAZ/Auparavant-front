import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

// Création d'un wrapper permettant de rediriger l'utilisateur vers la page d'accueil s'il n'est pas connecté

interface PageProps {
  children: React.ReactNode;
}

export default function Registered_to_login({ children }: PageProps) {
  const isRegistered = useAppSelector((state) => state.user.just_registered);

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  return children;
}
