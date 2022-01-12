import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState('')
  const [loading, setLoading] = useState(true)

  async function signup(username, email, password) {
    // signup user
    try {
      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
        method: 'POST',
        credentials: 'include',
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
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
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
      credentials: 'include',
    });

    if (rawResponse.status === 200) {
      setCurrentUser(undefined)
    }
  }

  function clearUser() {
    setCurrentUser()
  }

  function updateCurrentUser(res) {
    // add user info to local storage
    setCurrentUser(res.user)
  }

  async function getCurrentUser() {
    // get and set the current user
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/`, {
        method: 'GET',
        credentials: 'include',
      });
      const content = await res.json();

      if (res.status === 200) {
        setCurrentUser(...[content.user])
        setLoading(false)
        return content.user
      }
      setCurrentUser()
      setLoading(false)
    }
    catch (err) {
      setLoading(false)
      setCurrentUser()
      throw new Error(err.message)
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    signout,
    clearUser,
    getCurrentUser
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? '' : children}
    </AuthContext.Provider>
  )
}