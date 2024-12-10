import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';

type Props = {
  children: React.ReactNode;
};

export function DropdownMenuTrigger(props: Props) {
  const { children } = props;

  return (
    <RdxDropdownMenu.Trigger className="outline-none" asChild>
      {children}
    </RdxDropdownMenu.Trigger>
  );
}
