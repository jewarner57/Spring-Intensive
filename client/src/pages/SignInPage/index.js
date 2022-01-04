import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';
import AuthForm from '../../components/AuthForm';
import './style.css'

export default function SignupPage(props) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password)
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
                val: { email }, setVal: setEmail
              },
              {
                id: "password", label: 'Password', required: true, type: 'password',
                val: { password }, setVal: setPassword
              }
            ]}
          />
        </div>
      </div>
    </React.Fragment >
  );
}