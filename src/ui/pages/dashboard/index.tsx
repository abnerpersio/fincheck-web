import { useAuth } from '../../../app/hooks/use-auth';
import { Button } from '../../components/button';

export function DashboardPage() {
  const { signout } = useAuth();

  return (
    <>
      <h1>Dashboard</h1>

      <Button type="button" onClick={signout}>
        Sair
      </Button>
    </>
  );
}
