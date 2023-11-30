import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from './logo.png'; // Import your logo image
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';

const ServiceMenBookingComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { id } = state || {};
    const [entries, setEntries] = useState([]);
    useEffect( () => {
        
        const fetchData = async () => {
            const response = await fetch("http://127.0.0.1:5008/fetch_booking_details/" + id);
            const result = await response.json();
            alert("result: " + JSON.stringify(result));
            setEntries(result);
        };
        fetchData();
      }, []);


  return (
    <div>
      <header className="border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
              <img src={logo} className="d-block mx-lg-auto img-fluid" alt="simple" loading="lazy" width="50px" />
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="#" className="nav-link px-2 link-body-emphasis">About Us</a></li>
            </ul>

            <div className="dropdown text-end">
              <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
              </a>
              <ul className="dropdown-menu text-small">
                <li><a className="dropdown-item" href="">My Bookings</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/">Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <h2>My Bookings</h2>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Service</th>
            <th scope="col">User</th>
            <th scope="col">Status</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>
          {
            entries.map((entry, index)=>{
              let serviceName = entry.service_name;
              let userName = entry.name;
              let status = entry.status;
              let latitude = entry.latitude;
              let longitude = entry.longitude;
              return(
                <tr key={index}>
                  <th scope="row">1</th>
                  <td>{serviceName}</td>
                  <td>{userName}</td>
                  <td style={{color:'green'}}>{status}</td>
                  <td>[{latitude}, {longitude}]</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default ServiceMenBookingComponent;
