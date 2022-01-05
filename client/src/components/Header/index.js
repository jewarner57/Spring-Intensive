import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';
import './style.css';

export default function Header() {
  const { currentUser, signout } = useAuth()
  const navigate = useNavigate()

  return (
    <div>
      <div className="navbar">
        <div className="navbrand">
          <a href="/#/" className="navlink"><div className="branding"><span>i</span>nmige</div></a>
          {currentUser ?
            <a href="/#/newpost" className="navlink"><div className="button-primary">New Post</div></a>
            : ''
          }
        </div>
        <div className="navlinks">
          {/* is the user logged in */}
          {currentUser ?
            <>
              {currentUser.username ?
                <>
                  <a href={`/#/profile/${currentUser._id}`} className="navlink"><div className="username">{currentUser.username[0].toUpperCase() + currentUser.username.slice(1)}</div></a>
                  <a href={`/#/profile/${currentUser._id}`} className="navlink"><div className="button-primary">{currentUser.username[0].toUpperCase()}</div></a>
                </>
                : ''}
              <div className="navlink" onClick={() => {
                signout()
                navigate('/')
              }}>Logout</div>
            </>
            :
            <>
              <a href="/#/signin" className="navlink"><div>Login</div></a>
              <a href="/#/signup" className="navlink"><div className="button-primary">Sign up</div></a>
            </>
          }
        </div>
      </div>
    </div >
  );
}
