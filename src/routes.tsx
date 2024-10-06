import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './pages/auth/signin';
import RegisterNewAccount from './pages/auth/register_new_account';
import Dashboard from './pages/dashboard/dashboard';
import { UseAuth } from './services/context/auth';


export type KnownRoute = '/' | '/register' | '/dashboard';

export function MainRouter() {
  const auth = UseAuth();
  switch (auth.authResponse) {
    case null:
      return <AuthRouter />;
    default:
      return <AuthenticatedRouter />;
  }


  function AuthRouter() {
    return (
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<RegisterNewAccount />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  function AuthenticatedRouter() {
    return (
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    );
  }
}