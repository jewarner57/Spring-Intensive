import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './style.css';

export default function Header() {
  const { currentUser, signout } = useAuth()

  return (
    <div>
      <div className="navbar">
        <div className="branding"><span>i</span>nmige</div>
        <div className="navlinks">
          {/* is the user logged in */}
          {currentUser ?
            <div className="navlink button-primary" onClick={() => signout()}>Logout</div>
            :
            <React.Fragment>
              <a href="/#/signin" className="navlink"><div>Login</div></a>
              <a href="/#/signup" className="navlink"><div className="button-primary">Sign up</div></a>
            </React.Fragment>
          }
        </div>
      </div>
    </div>
  );
}
