import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner';

const PrivateRoutes = ({children}) => {
  const { user, loading } = useAuth();

  const location = useLocation()

  if (loading) return <Spinner />
  if (user) return children
  // return <Navigate to='/login' state={location.pathname} />
  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoutes;