import React, { useState } from 'react';
import './style.css'


export default function SignupPage(props) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)

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
            <button className="submit-button">SIGNUP NOW</button>
          </form >
        </div>
      </div>
    </React.Fragment >
  );
}