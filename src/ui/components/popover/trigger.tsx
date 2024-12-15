import * as RdxPopover from '@radix-ui/react-popover';

type Props = {
  children: React.ReactNode;
};

export function PopoverTrigger(props: Props) {
  const { children } = props;

  return (
    <RdxPopover.Trigger className="outline-none" asChild>
      {children}
    </RdxPopover.Trigger>
  );
}
