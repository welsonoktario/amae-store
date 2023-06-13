import clsx from 'clsx';
import { ReactNode } from 'react';

interface ModalDialogProps {
  open: boolean;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
}

export const ModalDialog = ({
  open,
  title,
  children,
  footer,
  onClose,
}: ModalDialogProps) => {
  return (
    <div className="fixed z-[60] h-screen w-screen">
      <dialog
        className={clsx(
          'modal modal-bottom h-full w-full sm:modal-middle',
          open && 'modal-open',
        )}
      >
        <div className="modal-box">
          <div
            className={clsx(
              'inline-flex w-full',
              title ? 'justify-between' : 'justify-end',
            )}
          >
            {title && <h3 className="text-lg font-bold">{title}</h3>}
            <button
              className="btn-ghost btn-sm btn-circle btn"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          <div className={clsx(title ? 'my-4' : 'mb-4')}>{children}</div>
          <div className="modal-action">{footer}</div>
        </div>
      </dialog>
    </div>
  );
};
