import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotalsAction } from '../redux/reducer/cartReducer';
import { eraseCookie, eraseStore, TOKEN, USER_LOGIN } from '../utils/config';

const Header = () => {
  const { userLogin } = useSelector((state) => state.userReducer);
  const { cartProducts, cartAmount } = useSelector(
    (state) => state.cartReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userLogin) {
      dispatch(calculateTotalsAction());
    }
  }, [cartProducts]);

  const renderLogin = () => {
    if (userLogin) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link text-light" to="/profile">
              Hello {userLogin.email}
            </NavLink>
          </li>
          <span
            className="mx-2 text-light d-flex align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (localStorage.getItem('fblst_1026190204826662')) {
                eraseStore('fblst_1026190204826662');
              }
              eraseStore(USER_LOGIN);
              eraseCookie(TOKEN);
              window.location.href = '/';
            }}
          >
            Logout
          </span>
        </>
      );
    }
    return (
      <NavLink className="nav-link active" aria-current="page" to="/login">
        Login
      </NavLink>
    );
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="index">
          <img src="./img/logo.png" alt="..." />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="my-2 my-lg-0 collapse navbar-collapse"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav ms-auto mb-2 my-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/search"
              >
                <i className="fa-solid fa-magnifying-glass"></i> Search
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/cart"
              >
                <i className="fa-solid fa-cart-plus"></i> ({cartAmount})
              </NavLink>
            </li>
            {renderLogin()}
            {!userLogin && (
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
