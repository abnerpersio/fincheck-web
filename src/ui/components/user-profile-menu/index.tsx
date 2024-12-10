import { ExitIcon } from '@radix-ui/react-icons';
import { useAuth } from '../../../app/hooks/use-auth';
import { cn } from '../../../app/utils/class-names';
import { DropdownMenu } from '../dropdown-menu';

export function UserProfileMenu() {
  const { signout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <div
          className={cn(
            'bg-teal-50 h-12 w-12 rounded-full flex items-center justify-center',
            'border border-teal-100',
          )}
        >
          <span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">
            {/* TODO: */}
            AB
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32 mt-2" align="end">
        <DropdownMenu.Item className="flex items-center justify-between gap-1" onSelect={signout}>
          Sair
          <ExitIcon className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
