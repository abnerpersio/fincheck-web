import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent } from './content';
import { DropdownMenuItem } from './item';
import { DropdownMenuTrigger } from './trigger';

type Props = {
  children: React.ReactNode;
};

export function DropdownMenu(props: Props) {
  const { children } = props;

  return <RdxDropdownMenu.Root>{children}</RdxDropdownMenu.Root>;
}

DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;
