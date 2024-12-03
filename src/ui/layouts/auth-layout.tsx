import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import AuthIllustration from '../components/icons/auth-illustration';
import { Logo } from '../components/icons/logo';

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div
        className={clsx(
          'w-full h-full',
          'lg:w-1/2',
          'flex flex-col items-center justify-center gap-16',
        )}
      >
        <Logo className="text-gray-500 h-6" />

        <div className="w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </div>

      <div
        className={clsx(
          'hidden',
          'lg:flex justify-center items-center',
          'relative w-1/2 h-full p-8',
        )}
      >
        <AuthIllustration
          className={clsx(
            'object-cover w-full h-full max-w-[656px] max-h-[960px]',
            'rounded-[32px]',
            'select-none',
          )}
        />

        <div
          className={clsx(
            'max-w-[656px]',
            'absolute bottom-8 bg-white p-10 rounded-b-[32px]',
            'flex flex-col items-start gap-6',
          )}
        >
          <Logo className="text-teal-900 h-8" />

          <p className="text-gray-700 font-medium text-xl">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor,
            totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
}
