import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/auth/signin';
import RegisterNewAccount from './pages/auth/register_new_account';


// Defina os tipos de rotas conhecidas (opcional)
export type KnownRoute = '/' | '/register' | '/dashboard';

export function MainRouter() {
  const isAuthenticated = false; // Mude essa lógica para a autenticação real

  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<RegisterNewAccount />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          // Rotas autenticadas
          <>
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} /> */}
          </>
        )}
      </Routes>
    </Router>
  );
}
