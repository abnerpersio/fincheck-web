import { Link } from 'react-router-dom';
import { routes } from '../../../infra/routes';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { useLoginController } from './hooks/use-login-controller';

export function LoginPage() {
  const { register, handleSubmit, isValid, errors, isLoading } = useLoginController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">Entre em sua conta</h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">Novo por aqui?</span>

          <Link className="font-medium text-teal-900 tracking-[-0.5px]" to={routes.register}>
            Crie uma conta
          </Link>
        </p>
      </header>

      <form noValidate onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />

        <Input
          label="Senha"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" className="mt-2" disabled={!isValid} isLoading={isLoading}>
          Entrar
        </Button>
      </form>
    </>
  );
}
