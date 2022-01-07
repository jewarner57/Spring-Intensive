import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../images/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

export default function Header() {
  const { currentUser, signout } = useAuth()
  const navigate = useNavigate()

  return (
    <div>
      <div className="navbar">
        <div className="navbrand">
          <Link to="/" className="navlink"><img className="branding-logo" src={logo} alt="inmige logo" /></Link>
          {currentUser ?
            <Link to="/newpost" className="navlink"><div className="button-primary">New Post</div></Link>
            : ''
          }
        </div>
        <div className="navlinks">
          {/* is the user logged in */}
          {currentUser ?
            <>
              {currentUser.username ?
                <>
                  <Link to={`/profile/${currentUser._id}`} className="navlink"><div className="username">{currentUser.username[0].toUpperCase() + currentUser.username.slice(1)}</div></Link>
                  <Link to={`/profile/${currentUser._id}`} className="navlink"><div className="button-primary">{currentUser.username[0].toUpperCase()}</div></Link>
                </>
                : ''}
              <div className="navlink" onClick={() => {
                signout()
                navigate('/')
              }}>Logout</div>
            </>
            :
            <>
              <Link to="/signin" className="navlink"><div>Login</div></Link>
              <Link to="/signup" className="navlink"><div className="button-primary">Sign up</div></Link>
            </>
          }
        </div>
      </div>
    </div >
  );
}
