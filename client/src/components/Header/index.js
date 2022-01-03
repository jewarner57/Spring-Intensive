import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './style.css';

export default function Header() {
  const { currentUser, signout } = useAuth()

  return (
    <div>
      <div className="navbar">
        <div class="branding"><span>i</span>nview</div>
        <div class="navlinks">
          {/* is the user logged in */}
          {currentUser ?
            <div class="navlink" onClick={() => signout()}>Sign out</div>
            :
            <React.Fragment>
              <div class="navlink">Sign in</div>
              <div class="navlink button-primary">Sign up</div>
            </React.Fragment>
          }
        </div>
      </div>
    </div>
  );
}
