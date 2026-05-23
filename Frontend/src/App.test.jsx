import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

describe('App Component', () => {
  it('renders without crashing and shows login/register options if not authenticated', () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    );

    // Check if the title text is somewhere in the document (the AppRoutes redirects unauthenticated to Login)
    expect(screen.getByText(/Welcome to TaskFlow/i)).toBeInTheDocument();
  });
});
