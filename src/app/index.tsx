import { Toaster } from 'react-hot-toast';
import { QueryProvider } from './providers/query';
import { Router } from './router';

export function App() {
  return (
    <QueryProvider>
      <Router />

      <Toaster position="bottom-right" />
    </QueryProvider>
  );
}
