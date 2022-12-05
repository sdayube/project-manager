import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { ProtectedRoute } from './routers/ProtectedRoute';

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
