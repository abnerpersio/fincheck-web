import { Logo } from '../../components/icons/logo';
import { UserProfileMenu } from '../../components/user-profile-menu';
import { Accounts } from './components/accounts';
import { Transactions } from './components/transactions';

export function DashboardPage() {
  return (
    <div className="w-full h-full p-4 md:p-8 md:pt-6 flex flex-col gap-4">
      <header className="h-12 w-full flex justify-between items-center">
        <Logo className="h-6 text-teal-900" />

        <UserProfileMenu />
      </header>

      <main className="flex-1 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Accounts />
        </div>

        <div className="w-full md:w-1/2">
          <Transactions />
        </div>
      </main>
    </div>
  );
}
