import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ component: Component }) {
  const { currentUser } = useAuth();
  let location = useLocation();

  if (!currentUser) {
    // Redirect them to the login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // As a component passed to PrivateRoute is capitalized (Component), it's treated as a React component here.
  return <Component />;
}
