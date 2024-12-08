import { useContext } from 'react';
import { DashboardContext } from '../contexts/dashboard';

export function useDashboard() {
  return useContext(DashboardContext);
}
