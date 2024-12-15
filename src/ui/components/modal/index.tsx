import * as RdxDialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import React from 'react';
import { cn } from '../../../app/utils/class-names';

type Props = {
  visible: boolean;
  children: React.ReactNode;
  rightAction?: React.ReactNode;
  contentClassName?: string;
  title: string;
  onClose?: () => void;
};

export function Modal(props: Props) {
  const { visible, children, title, rightAction, contentClassName, onClose } = props;

  return (
    <RdxDialog.Root open={visible} onOpenChange={onClose}>
      <RdxDialog.Portal>
        <RdxDialog.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center',
            'data-[state=open]:animate-overlay-show',
          )}
        />

        <RdxDialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            'w-full max-w-[400px]',
            'bg-white p-6 space-y-10 rounded-2xl z-[51] shadow-[0px_11px_20px_0px_rgba(0,0,0,0.1)]',
            'data-[state=open]:animate-content-show',
            contentClassName,
          )}
        >
          <header className="h-12 flex items-center justify-between text-gray-800">
            <button
              className="w-12 h-12 flex items-center justify-center"
              type="button"
              onClick={onClose}
            >
              <Cross2Icon className="w-6 h-6" />
            </button>

            <RdxDialog.Title>
              <span className="text-lg font-bold tracking-[-1px]">{title}</span>
            </RdxDialog.Title>

            <div className="w-12 h-12 flex items-center justify-center">{rightAction}</div>
          </header>

          <div>{children}</div>
        </RdxDialog.Content>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  );
}
