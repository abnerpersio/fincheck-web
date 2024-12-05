import { Navigate, Outlet } from 'react-router-dom';
import { routes } from '../../../infra/constants/routes';
import { useAuth } from '../../hooks/use-auth';

type Props = {
  type: 'public' | 'private';
};

export function AuthGuard(props: Props) {
  const { type } = props;

  const { signedIn } = useAuth();

  if (!signedIn && type === 'private') {
    return <Navigate to={routes.login} replace />;
  }

  if (!!signedIn && type === 'public') {
    return <Navigate to={routes.home} replace />;
  }

  return <Outlet />;
}
