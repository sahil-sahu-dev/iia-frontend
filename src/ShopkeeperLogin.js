import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ShopKeeperLoginComponent = () => {
    const [id, setId] = useState('');
    const navigate = useNavigate();


    const handleLogin = () => {  
      // alert(id);
        navigate("/shopkeeperHome", {state:{id}});
    };
  
    return (
      <div className="container mt-5">
        <img src={logo} style={{width:'150px', height:'150px'}}/>
        <h1>ShopKeeper Login</h1>
        <form >
          <div className="mb-3">
            <label htmlFor="id" className="form-label">
              ShopKeeper ID
            </label>
            <input style = {{"width":"300px"}}
              type="text"
              className="form-control form-control-sm" // Use form-control-sm for smaller size
              id="Id"
              value={id}
              onChange={(e) => setId(e.target.value)}
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
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleLogin}>
            Login
          </button> &nbsp;&nbsp;&nbsp;
        </form>
      </div>
    );
  };

export default ShopKeeperLoginComponent;