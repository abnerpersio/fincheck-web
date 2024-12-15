import * as RdxPopover from '@radix-ui/react-popover';
import { cn } from '../../../app/utils/class-names';

type Props = {
  children: React.ReactNode;
  className?: string;
  side?: 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
};

export function PopoverContent(props: Props) {
  const { children, className, side = 'bottom', align = 'center' } = props;

  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        side={side}
        align={align}
        className={cn(
          'rounded-2xl p-4 bg-white z-[99]',
          'shadow-[0px_11px_20px_0px_rgba(0,0,0,0.18)]',
          'data-[side=bottom]:animate-slide-up-and-fade',
          'data-[side=top]:animate-slide-down-and-fade',
          className,
        )}
      >
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  );
}
