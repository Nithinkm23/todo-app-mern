import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaLink, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">TO DO APP</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/" activeClassName="active">
                <FaHome /> Home
              </NavLink>
            </li>
           
            
          </ul>

         
        </div>
      </nav>
    </div>
  );
}

export default Header;
