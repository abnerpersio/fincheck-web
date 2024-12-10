import { useDashboard } from '../../../hooks/use-dashboard';

export function useNewAccountModalController() {
  const { isNewAccountModalVisible, onCloseNewAccountModal } = useDashboard();

  return {
    isNewAccountModalVisible,
    onCloseNewAccountModal,
  };
}
