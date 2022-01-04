import React from 'react';
import { useAuth } from '../../contexts/AuthContext'
import { Outlet, Navigate, useLocation } from 'react-router-dom';

export default function RequireAuth() {
  const { currentUser } = useAuth()
  const location = useLocation()

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return <Outlet />;
}