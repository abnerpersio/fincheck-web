import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/auth';
import { QueryProvider } from './providers/query';
import { Router } from './router';

export function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <Router />

        <Toaster position="bottom-right" />
      </AuthProvider>
    </QueryProvider>
  );
}
