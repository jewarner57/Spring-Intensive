import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';
import AuthForm from '../../components/AuthForm';
import './style.css'


export default function SignupPage(props) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [username, setUsername] = useState()
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
          <AuthForm
            error={error}
            loading={loading}
            submitText="SIGNUP NOW"
            handleFormSubmit={handleFormSubmit}
            fields={[
              {
                id: "username", label: 'Username', required: true, type: 'text',
                val: { username }, setVal: { setUsername }
              },
              {
                id: "email", label: 'Email', required: true, type: 'email',
                val: { email }, setVal: { setEmail }
              },
              {
                id: "password", label: 'Password', required: true, type: 'password',
                val: { password }, setVal: { setPassword }
              }
            ]}
          />
        </div>
      </div>
    </React.Fragment >
  );
}