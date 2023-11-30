import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from './logo.png'; // Make sure to import your logo image
import {useLocation} from 'react-router-dom';

const ServiceProviderDataSourceComponent = () => {
    const location = useLocation();
    const { state } = location;
    const { id } = state || {};
    const [databaseName, setDatabaseName] = useState("");
    // alert("id: " + id);

    const handleAdd = async ()=>{
        alert("add");
        const formData = new FormData();
        formData.append('file', document.getElementById('formFile').files[0]);
        formData.append('id', id);
        const response = await fetch('http://127.0.0.1:5011/add-service-db', {
            method: 'POST',
            body: formData,
        });
        var result = await response.text();
        alert(result);
    }

    const handleRemove = async ()=>{
        alert("remove");
        const response = await fetch("http://127.0.0.1:5010/remove-service-db/" + databaseName);
        var result = await response.text();
        alert(result);
    }



  return (
    <div>
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
                <li><a className="dropdown-item" href="#">My Bookings</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/">Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <h2 className="ms-3 mt-3">Add/Delete Data Source</h2>

      <div className="mb-3 ms-5 me-5">
        <label htmlFor="formFile" className="form-label">Add Database</label>
        <input className="form-control" type="file" id="formFile" />
        
        <button className="btn btn-primary mt-3" type="button" onClick = {handleAdd}>Submit</button>
        <div className="mb-3">
            <label htmlFor="databaseName" className="form-label">
              Database Name
            </label>
            <input style = {{"width":"300px"}}
              type="text"
              className="form-control form-control-sm" // Use form-control-sm for smaller size
              id="databaseName"
              value={databaseName}
              onChange={(e) => setDatabaseName(e.target.value)}
            />
        </div>
      </div>

        
      <div className="mb-3 ms-5">
        <label htmlFor="formFile" className="form-label">Remove Database</label>
        <p>
          <button className="btn btn-primary" type="button" onClick = {handleRemove}>Remove</button>
        </p>
      </div>

    </div>
  );
};

export default ServiceProviderDataSourceComponent;
