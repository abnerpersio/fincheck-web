import * as RdxPopover from '@radix-ui/react-popover';
import { PopoverContent } from './content';
import { PopoverTrigger } from './trigger';

type Props = {
  children: React.ReactNode;
};

export function Popover(props: Props) {
  const { children } = props;

  return <RdxPopover.Root modal>{children}</RdxPopover.Root>;
}

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
