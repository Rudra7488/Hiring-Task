import { FiX } from 'react-icons/fi';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm"
          onClick={onClose}
        />

        <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-gray-100">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-3">
              <h3 className="text-xl font-semibold leading-6 text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-full p-1 bg-white text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
