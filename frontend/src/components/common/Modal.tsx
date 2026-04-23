// frontend/src/components/common/Modal.tsx
import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-zinc-900 w-full max-w-lg rounded-3xl p-10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-8">{title}</h2>

        {children}

        {footer && <div className="mt-8">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;