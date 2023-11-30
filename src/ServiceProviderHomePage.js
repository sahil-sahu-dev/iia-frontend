import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useLocation } from 'react-router-dom';
import logo from './logo.png'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';



const ServiceProviderHomePageComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { email, password } = state || {};
    // alert(email + " , " + password);
    const [id, setId] = useState(10);
    const [entries, setEntries] = React.useState([]);

    const bookingsClicked = ()=>{
        navigate('/serviceProviderBookings', { state: { id } });
    }

    const dataSourceClicked = ()=>{
      navigate('/serviceProviderDataSource', { state: { id } });
    }

    useEffect( () => {
        
        const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:5008/fetch_service_provider_id', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },  
            body: JSON.stringify({ email, password }),
            });
            let result = await response.text();
            let r = JSON.parse(result);
            setId(r.id);
            // alert(r.id);

            const response2 = await fetch('http://127.0.0.1:5008/fetch_pending_booking/' + r.id);
            const result2 = await response2.json();
            if(result2.result == 'No pending bookings found for the given service provider'){
              setEntries([]);
            }
            else{
            setEntries(result2);
            }
            alert(JSON.stringify(result2));
            console.log(result2);
        };
        fetchData();
      }, []);

    return (
    <>
      <header className="border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
              <img src={logo} className="d-block mx-lg-auto img-fluid" alt="simple" loading="lazy" width="100px" />
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="#" className="nav-link px-2 link-body-emphasis">About Us</a></li>
            </ul>

            <div className="dropdown text-end">
              <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
              </a>
              <ul className="dropdown-menu text-small">
                <li><a className="dropdown-item" onClick = {bookingsClicked}>Bookings</a></li>
                <li><a className="dropdown-item" onClick = {dataSourceClicked}>Data Source</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/">Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div className="p-5 text-center bg-body-tertiary rounded-3">
        <h1 className="text-body-emphasis">Welcome Service Provider!</h1>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Service</th>
            <th scope="col">User Name</th>
            <th scope="col">User Contact</th>
            <th scope="col">Location</th>
            <th scope="col">Accept</th>
          </tr>
        </thead>
        <tbody>
          {
            entries.map((entry, index)=>{
              let bookingId = entry.b_id;
              const handleAccept = async ()=>{
                const response2 = await fetch('http://127.0.0.1:5008/accept_booking/' + bookingId);
                const result2 = await response2.json();
                alert(JSON.stringify(result2));
                entries.splice(index,1);
                setEntries(entries);
              }
              const handleReject = async ()=>{
                const response2 = await fetch('http://127.0.0.1:5008/reject_booking/' + bookingId);
                const result2 = await response2.json();
                alert(JSON.stringify(result2));
                entries.splice(index,1);
                setEntries(entries);
              }
              let serviceName = entry.service_name;
              let userName = entry.name;
              let latitude = entry.latitude;
              let longitude = entry.longitude;
              let contact = entry.phone_number;
              return(
                <tr key={index}>
            <th scope="row">1</th>
            <td>{serviceName}</td>
            <td>{userName}</td>
            <td>{contact}</td>
            <td>[{latitude},{longitude}]</td>
            <td>
              <button className="btn btn-success d-inline-flex align-items-center" type="button" onClick={handleAccept}>
                Accept
                <svg className="bi ms-1" width="10" height="10"><use xlinkHref="#arrow-right-short"></use></svg>
              </button>
              <button className="btn btn-danger d-inline-flex align-items-center" type="button" onClick={handleReject}>
                Reject
                <svg className="bi ms-1" width="15" height="15"><use xlinkHref="#arrow-right-short"></use></svg>
              </button>
            </td>
          </tr>
              )
            })
          }

        </tbody>
      </table>

    </>
  );
}

export default ServiceProviderHomePageComponent;
