import { FiLoader } from 'react-icons/fi';

export default function Loader({ className = '' }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <FiLoader className="animate-spin h-8 w-8 text-blue-600" />
    </div>
  );
}
