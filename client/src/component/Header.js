import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Route, Routes } from 'react-router-dom'; // Routes and Route import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ROUTES from '../navigation/Route';
import axios from 'axios';


import UserManagement from '../container/admin/user/UserManagement';

function Header() {
  const [user, setUser] = useState({ id: null, role: null });
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let id = localStorage.getItem('id');
    let role = localStorage.getItem('role');
    if (id) setUser({ id: id, role: role });

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cart.length);
    };

    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  function renderMenus() {
    if (user?.role === "admin") {
      return (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={ROUTES.universityAdmin.name}>University Management</Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/user-management">User Management</Link> {/* UserManagementPage के लिए नया लिंक */}
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="order-management">Order Management</Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={ROUTES.home.name}>Home</Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={ROUTES.about.name}>About</Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={ROUTES.contact.name}>Contact</Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={ROUTES.support.name}>Support</Link>
          </li>
        </ul>
      );
    }
  }

  function renderButton() {
    if (user?.id) {
      return (
        <>
          <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => {
            localStorage.removeItem('id');
            localStorage.removeItem('role');
            navigate(ROUTES.login.name);
          }}>Logout</button>
          <button className="btn btn-outline-success my-2 my-sm-0 ml-2" onClick={() => {
            navigate(ROUTES.cart.name);
          }}>
            <FontAwesomeIcon icon={faShoppingCart} /> Cart ({cartCount})
          </button>
        </>
      );
    } else {
      return (
        <>
          <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => {
            navigate(ROUTES.register.name);
          }}>Register</button>
          <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => {
            navigate(ROUTES.login.name);
          }}>Login</button>
        </>
      );
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {renderMenus()}
          {renderButton()}
        </div>
      </nav>

      {/* UserManagementPage के लिए रूट */}
    </div>
  );
}

export default Header;