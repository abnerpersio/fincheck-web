import { cn } from '../../../app/utils/class-names';

export function UserProfileMenu() {
  return (
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
  );
}
