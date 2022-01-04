import React, { useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()

  async function signup(email, password) {
    // signup user
    try {
      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const content = await rawResponse.json();

      // If the response is not 200 throw an error
      if (rawResponse.status !== 200) {
        throw new Error(content.err)
      }

      setCurrentUser(content.user)
    }
    catch (err) {
      // console.log(err)
      throw new Error(err.message)
    }
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