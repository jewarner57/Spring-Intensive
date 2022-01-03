import React, { useContext, useState, useEffect } from "react";
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()

  function signup(email, password) {
    // signup user
  }

  async function login(email, password, rememberMe) {
    // login user
  }

  function signout() {
    // logout user
  }

  const value = {
    currentUser,
    signup,
    login,
    signout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}