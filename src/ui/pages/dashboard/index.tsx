import { Logo } from '../../components/icons/logo';
import { UserProfileMenu } from '../../components/user-profile-menu';
import { Accounts } from './components/accounts';
import { EditAccountModal } from './components/edit-account-modal';
import { EditTransactionModal } from './components/edit-transaction-modal';
import { Fab } from './components/fab';
import { NewAccountModal } from './components/new-account-modal';
import { NewTransactionModal } from './components/new-transaction-modal';
import { Transactions } from './components/transactions';
import { DashboardProvider } from './contexts/dashboard';

export function DashboardPage() {
  return (
    <DashboardProvider>
      <div className="w-full h-full p-4 md:p-8 md:pt-6 flex flex-col gap-4">
        <header className="h-12 w-full flex justify-between items-center">
          <Logo className="h-6 text-teal-900" />

          <UserProfileMenu />
        </header>

        <main className="flex-1 flex flex-col md:flex-row gap-4 max-h-full">
          <div className="w-full md:w-1/2">
            <Accounts />
          </div>

          <div className="w-full md:w-1/2">
            <Transactions />
          </div>
        </main>

        <Fab />

        <NewAccountModal />

        <EditAccountModal />

        <NewTransactionModal />

        <EditTransactionModal />
      </div>
    </DashboardProvider>
  );
}
