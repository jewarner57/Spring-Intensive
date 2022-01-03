import { HashRouter, Route, Routes } from 'react-router-dom'
import Error404Page from '../Error404Page'
import { AuthProvider } from '../../contexts/AuthContext'
import LandingPage from '../LandingPage'
import './style.css';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />

          {/* <Route exact path="/signin" component={SigninPage} />
          <Route exact path="/signup" component={SignupPage} /> */}

          {/* 404 page */}
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
