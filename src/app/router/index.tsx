import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from '../../infra/routes';
import { AuthLayout } from '../../ui/layouts/auth-layout';
import { DashboardPage } from '../../ui/pages/dashboard';
import { LoginPage } from '../../ui/pages/login';
import { RegisterPage } from '../../ui/pages/register';
import { AuthGuard } from './guards/auth-guard';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard type="public" />}>
          <Route element={<AuthLayout />}>
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.register} element={<RegisterPage />} />
          </Route>
        </Route>

        <Route element={<AuthGuard type="private" />}>
          <Route path={routes.home} element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
