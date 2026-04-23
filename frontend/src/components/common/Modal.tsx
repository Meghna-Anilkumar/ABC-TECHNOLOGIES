import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Modal = ({ isOpen, onClose, title, children, footer, size = 'md' }: ModalProps) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className={`bg-zinc-900 w-full ${sizeClasses[size]} rounded-3xl p-10 relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-8">{title}</h2>

        <div className="mb-8">{children}</div>

        {footer && <div className="flex gap-4">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;