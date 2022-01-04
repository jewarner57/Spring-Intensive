import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()

  async function signup(username, email, password) {
    // signup user
    try {
      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
      const content = await rawResponse.json();

      // If the response is not 200 throw an error
      if (rawResponse.status !== 200) {
        throw new Error(content.err)
      }

      updateCurrentUser(content)
    }
    catch (err) {
      // console.log(err)
      throw new Error(err.message)
    }
  }

  async function login(email, password) {
    // login user
    try {
      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/signin`, {
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

      updateCurrentUser(content)
    }
    catch (err) {
      // console.log(err)
      throw new Error(err.message)
    }
  }

  async function signout() {
    // logout user
    // clear user info from local storage

    const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/signout`, {
      method: 'POST',
    });

    if (rawResponse.status === 200) {
      localStorage.removeItem('currentUser')
      setCurrentUser(undefined)
    }
  }

  function updateCurrentUser(res) {
    // add user info to local storage
    localStorage.setItem('currentUser', res.user)
    setCurrentUser(res.user)
  }

  async function getCurrentUser() {
    try {
      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/`, {
        method: 'POST',
      });
      const content = await rawResponse.json();

      if (rawResponse.status === 200) {
        localStorage.setItem('currentUser', content.user)
        setCurrentUser(content.user)
      }
      setCurrentUser()

    }
    catch (err) {
      throw new Error(err.message)
    }
  }

  useEffect(() => {
    // if a user is in local storage then set it as current user
    getCurrentUser()

  }, [])

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