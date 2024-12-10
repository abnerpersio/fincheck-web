import { Modal } from '../../../../components/modal';
import { useNewAccountModalController } from './hooks/use-new-account-modal-controller';

export function NewAccountModal() {
  const { isNewAccountModalVisible, onCloseNewAccountModal } = useNewAccountModalController();

  return (
    <Modal title="Nova Conta" visible={isNewAccountModalVisible} onClose={onCloseNewAccountModal}>
      Teste
    </Modal>
  );
}
