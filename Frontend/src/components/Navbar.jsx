import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl shadow-md">
                <MdDashboard className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">
                TaskFlow
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="h-9 w-9 rounded-full bg-indigo-100 border border-indigo-200 shadow-inner flex items-center justify-center">
                    <span className="text-indigo-700 font-bold text-sm">
                      {(user?.user?.name || user?.name || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {user?.user?.name || user?.name || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                  title="Logout"
                >
                  <FiLogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
