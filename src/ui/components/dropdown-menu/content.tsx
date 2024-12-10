import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '../../../app/utils/class-names';

type Props = {
  children: React.ReactNode;
  className?: string;
  side?: 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
};

export function DropdownMenuContent(props: Props) {
  const { children, className, side = 'bottom', align = 'center' } = props;

  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content
        side={side}
        align={align}
        className={cn(
          'rounded-2xl p-2 bg-white z-50',
          'shadow-[0px_11px_20px_0px_rgba(0,0,0,0.18)]',
          'data-[side=bottom]:animate-slide-up-and-fade',
          'data-[side=top]:animate-slide-down-and-fade',
          className,
        )}
      >
        {children}
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  );
}
