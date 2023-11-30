import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png'
import { useNavigate } from "react-router-dom";

const ServiceProviderLoginComponent = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {   
        setErrorMessage("");
        const response = await fetch('http://127.0.0.1:5006/service_provider_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        });
        if(response.ok){
            const result = await response.text();
            alert(result);
            var r = JSON.parse(result);
            if(r.result){
              navigate('/serviceProviderHome', { state: { email, password } });
            }
            else{
                setErrorMessage("Invalid Username or password");
            }
        }
        else{
            alert("failed");
        }
    };
  
    return (
      <div className="container mt-5">
        <img src={logo} style={{width:'150px', height:'150px'}}/>
        <h1>Service Provider Login</h1>
        <br></br><span style={{'color':'red'}}>{errorMessage}</span>
        <form >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input style = {{"width":"300px"}}
              type="text"
              className="form-control form-control-sm" // Use form-control-sm for smaller size
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input style = {{"width":"300px"}}
              type="password"
              className="form-control form-control-sm" // Use form-control-sm for smaller size
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleLogin}>
            Login
          </button> &nbsp;&nbsp;&nbsp;
        </form>
      </div>
    );
  };

export default ServiceProviderLoginComponent;