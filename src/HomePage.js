import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png'

const HomePageComponent = ()=>{
    return (
        <header className="p-3 mb-3 border-bottom">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                <img src={logo} className="d-block mx-lg-auto img-fluid" alt="simple" loading="lazy" width="100px" />
              </a>
    
              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li><a href="#" className="nav-link px-2 link-body-emphasis">Current Bookings</a></li>
                <li><a href="#" className="nav-link px-2 link-body-emphasis">Customers</a></li>
                <li><a href="#" className="nav-link px-2 link-body-emphasis">Products</a></li>
              </ul>
    
              <div className="dropdown text-end">
                <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                </a>
                <ul className="dropdown-menu text-small">
                  <li><a className="dropdown-item" href="#">Bookings & Feedbacks</a></li>
                  <li><a className="dropdown-item" href="#">Data Source</a></li>
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
              </div>
            </div>
          </div>
        </header>
      );
}

export default HomePageComponent;
