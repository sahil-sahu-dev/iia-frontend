import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png'; // Make sure to import your logo image
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {useLocation} from 'react-router-dom';

const ShopKeeperHomePageComponent = () => {
  const location = useLocation();
  const { state } = location;
  const { id } = state || {};
  alert("id: " + id);

  const [selectedRadio, setSelectedRadio] = useState("electrical");
  const [databaseName, setDatabaseName] = useState("");
  const handleRadioChange = (event) => {
    // alert(event.target.value);
    setSelectedRadio(event.target.value);
  };
    const handleAdd = async ()=>{
      if(selectedRadio == "electrical"){
        const formData = new FormData();
        formData.append('file', document.getElementById('formFile').files[0]);
        formData.append('id', id);
        const response = await fetch('http://127.0.0.1:5011/add-electrical-db', {
            method: 'POST',
            body: formData,
        });
        var result = await response.text();
        alert(result);
      }
      if(selectedRadio == "furniture"){
        const formData = new FormData();
        formData.append('file', document.getElementById('formFile').files[0]);
        formData.append('id', id);
        const response = await fetch('http://127.0.0.1:5013/add-furniture-db', {
            method: 'POST',
            body: formData,
        });
        var result = await response.text();
        alert(result);
      }
      if(selectedRadio == "generalHardware"){
        const formData = new FormData();
        formData.append('file', document.getElementById('formFile').files[0]);
        formData.append('id', id);
        const response = await fetch('http://127.0.0.1:5015/add-general-db', {
            method: 'POST',
            body: formData,
        });
        var result = await response.text();
        alert(result);
      }
    }

    const handleRemove = async ()=>{
      if(selectedRadio == "electrical"){
        const response = await fetch("http://127.0.0.1:5012/remove-electrical-db/" + databaseName);
        const result = await response.text();
        alert(result);
      }
      if(selectedRadio == "furniture"){
        alert("hell");
        const response = await fetch("http://127.0.0.1:5014/remove-furniture-db/" + databaseName);
        const result = await response.text();
        alert(result);
      }
      if(selectedRadio == "generalHardware"){
        const response = await fetch("http://127.0.0.1:5016/remove-general-db/" + databaseName);
        const result = await response.text();
        alert(result);
      }
    }

    return (
      <div>
        <header className=" border-bottom">
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
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
              </div>
            </div>
          </div>
        </header>
  
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <h1 className="text-body-emphasis">Welcome Shopkeeper!</h1>
        </div>
  
        <h2 className="ms-3 mt-3 mb-5">Add/Delete Data Source</h2>
  
        <div className="form-check form-check-inline ms-5 mb-5">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="electrical" onChange={handleRadioChange}/>
          <label className="form-check-label" htmlFor="inlineRadio1">Electrical Store</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="furniture" onChange={handleRadioChange}/>
          <label className="form-check-label" htmlFor="inlineRadio2">Furniture Store</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="generalHardware" onChange={handleRadioChange}/>
          <label className="form-check-label" htmlFor="inlineRadio3">General Hardware</label>
        </div>
  
        <div className="mb-3 ms-5 me-5">
          <label htmlFor="formFile" className="form-label">Add Database</label>
          <input className="form-control" type="file" id="formFile" />
          <button className="btn btn-primary mt-3" type="button" onClick={handleAdd}>Submit</button>
        </div>
  
        <div className="mb-3 ms-5">
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
          <p>
            <button className="btn btn-primary mt-3" type="button" onClick={handleRemove}>Remove</button>
          </p>
        </div>
  
      </div>
    );    
};

export default ShopKeeperHomePageComponent;
