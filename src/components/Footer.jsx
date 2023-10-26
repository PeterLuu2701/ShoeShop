import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3">
          <div className="col">
            <h3>GET HELP</h3>
            <ul>
              <li>Home</li>
              <li>Nike</li>
              <li>Adidas</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="col">
            <h3>SUPPORT</h3>
            <ul>
              <li>About</li>
              <li>Contact</li>
              <li>Help</li>
              <li>Phone</li>
            </ul>
          </div>
          <div className="col">
            <h3>REGISTER</h3>
            <ul>
              <li>Register</li>
              <li>Login</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
