import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import Button from '../components/Button';
import { MdDashboard } from 'react-icons/md';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center transform transition-transform hover:scale-105 duration-300">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg shadow-blue-500/30">
            <MdDashboard className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="mt-8 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome to TaskFlow
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 font-medium">
          Sign in to manage your projects efficiently
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 backdrop-blur-xl py-10 px-6 shadow-2xl shadow-slate-200/50 sm:rounded-3xl sm:px-12 border border-white/50">
          <form className="space-y-7" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full py-2.5 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
