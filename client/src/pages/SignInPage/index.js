import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import './style.css'

export default function SignupPage(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
      setLoading(false)
      // if a from is specified, navigate the user there
      // from is like a next param, it's set if the user is redirected
      // to signin from a different page
      navigate(location?.state?.from ? location.state.from : '/')
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
          <p className="form-intro">Welcome back,</p>
          <h2 className="form-title">Login to your account</h2>
          <AuthForm
            error={error}
            loading={loading}
            submitText="LOGIN NOW"
            handleFormSubmit={handleFormSubmit}
            fields={[
              {
                id: "email", label: 'Email', required: true, type: 'email',
                val: email, setVal: setEmail
              },
              {
                id: "password", label: 'Password', required: true, type: 'password',
                val: password, setVal: setPassword
              }
            ]}
          />
          <p>Don't have an account? <Link to="/signup">Signup!</Link></p>
        </div>
      </div>
    </React.Fragment >
  );
}