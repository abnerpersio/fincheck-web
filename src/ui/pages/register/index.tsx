import { Link } from 'react-router-dom';
import { routes } from '../../../infra/constants/routes';
import { classNames } from '../../../shared/utils/class-names';
import { Button } from '../../components/button';
import { Input } from '../../components/input';

export function RegisterPage() {
  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">Crie sua conta</h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">Já possui uma conta?</span>

          <Link
            className={classNames('font-medium text-teal-900 tracking-[-0.5px]')}
            to={routes.login}
          >
            Fazer login
          </Link>
        </p>
      </header>

      <form noValidate className="mt-[60px] flex flex-col gap-4">
        <Input name="name" label="Nome" />

        <Input name="email" label="Email" type="email" />

        <Input name="password" label="Senha" type="password" />

        <Button type="submit" className="mt-2">
          Criar conta
        </Button>
      </form>
    </>
  );
}
