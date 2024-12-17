import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '../../../app/utils/class-names';

type Props = {
  children: React.ReactNode;
  className?: string;
  onSelect?: () => void;
};

export function DropdownMenuItem(props: Props) {
  const { children, className, onSelect } = props;

  return (
    <RdxDropdownMenu.Item
      role="button"
      onSelect={onSelect}
      className={cn(
        'min-h-[40px] flex items-center py-2 px-4 text-sm text-gray-800',
        'data-[highlighted]:bg-gray-50 rounded-2xl cursor-pointer transition-colors',
        className,
      )}
    >
      {children}
    </RdxDropdownMenu.Item>
  );
}
