import { ChevronDownIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Color, COLORS } from '../../../app/constants/colors';
import { cn } from '../../../app/utils/class-names';
import { DropdownMenu } from '../dropdown-menu';
import { ColorIcon } from '../icons/color';

type Props = {
  className?: string;
  error?: string;
  label?: string;
};

export function ColorsInput(props: Props) {
  const { className, error, label } = props;

  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  const handleSelect = (color: Color) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <button
            className={cn(
              'bg-white text-gray-700 rounded-lg border border-gray-500',
              'px-3 h-[52px] w-full',
              'focus:border-gray-800 transition-all',
              'text-left relative',
              error && '!border-red-900',
              className,
            )}
          >
            {label}

            <div className={cn('absolute right-3 top-1/2 -translate-y-1/2')}>
              {!selectedColor && <ChevronDownIcon className={cn('w-6 h-6 text-gray-800')} />}

              {!!selectedColor && <ColorIcon bg={selectedColor.bg} color={selectedColor.main} />}
            </div>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="grid grid-cols-4">
          {COLORS.map((color) => (
            <DropdownMenu.Item key={color.main} onSelect={() => handleSelect(color)}>
              <ColorIcon bg={color.bg} color={color.main} />
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />

          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
