import { Button } from '../button';
import { TrashIcon } from '../icons/trash';
import { Modal } from '../modal';

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
  title: string;
  description?: string;
};

export function ConfirmDeleteModal(props: Props) {
  const { visible, title, description, isLoading, onConfirm, onClose } = props;

  return (
    <Modal visible={visible} title="Excluir" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="h-[52px] w-[52px] rounded-full bg-red-50 flex items-center justify-center text-red-900">
          <TrashIcon className="w-6 h-6" />
        </div>

        <p className="w-[180px] text-gray-800 tracking-[-0.5px] font-bold">{title}</p>

        {description && <p className="text-gray-800 tracking-[-0.5px]">{description}</p>}
      </div>

      <div className="mt-10 space-y-4">
        <Button className="w-full" variant="danger" onClick={onConfirm} isLoading={isLoading}>
          Sim, desejo excluir
        </Button>

        <Button className="w-full" variant="ghost" onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
