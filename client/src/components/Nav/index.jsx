import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

import './style.scss';

export default function Nav() {

  return (
    <header>
      {/* className={`header-theme__${theme.dark ? 'dark' : 'light'}`} */}
      {/* <div>
        <img className="header-logo" src={logo} alt="Logo" />
      </div> */}

      <div>
        <nav className="navbar">
          {!Auth.loggedIn() && (
            <Link to="/login">Login</Link>
          )}
          {Auth.loggedIn() && (
            <>
              <Link to="/">Home</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/recent-purchases">Recent Purchases</Link>
              <div id="logout" className="logout-link" onClick={() => Auth.logout()}>Logout</div>
            </>
          )}
        </nav>

        {/* <img
          onClick={() => dispatch({ type: THEME_TOGGLE })}
          className="header-theme-toggle"
          src={darkToggle}
          alt="Theme Toggle"
        /> */}
      </div>
    </header>
  );
}