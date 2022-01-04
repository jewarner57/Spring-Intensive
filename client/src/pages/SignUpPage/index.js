import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';
import './style.css'


export default function SignupPage(props) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const { signup } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signup(email, password)
      setLoading(false)
      navigate('/#/')
    }
    catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <React.Fragment>
      <div className="signup-page">
        <div className="paper">
          <p className="form-intro">Welcome,</p>
          <h2 className="form-title">Create an account</h2>
          <form className="formbody" noValidate onSubmit={handleFormSubmit}>
            <label htmlFor="email">Email *</label>
            <input id="email" type="email" className="form-field" val={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="email">Password *</label>
            <input id="password" type="password" className="form-field" val={password} onChange={(e) => setPassword(e.target.value)} />
            {error ? <p className="error-text">{error}</p> : ""}
            <button className="submit-button" disabled={loading}>SIGNUP NOW</button>
          </form >
        </div>
      </div>
    </React.Fragment >
  );
}