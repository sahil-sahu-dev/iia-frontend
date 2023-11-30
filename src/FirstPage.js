import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './features.css'; // Make sure to adjust the path accordingly
import bl from './brand-logo.png'
import { useNavigate } from "react-router-dom";
const FirstPageComponent = () => {
    const navigate = useNavigate();
    const userButton = ()=>{
        navigate("/userLogin");
    }

    const serviceProviderButton = ()=>{
        navigate("/serviceProviderLogin");
    }

    const shopKeeperButton = ()=>{
        navigate("/shopkeeperLogin");
    }

    const serviceMenButton = ()=>{
        navigate("/serviceMenLogin");
    }    

  return (
    <>
      <div className="container my-5">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <img src={bl} alt="Brand Logo" />
          <h1 className="text-body-emphasis">Simple</h1>
          <p className="col-lg-8 mx-auto fs-5 text-muted">
            One Stop Solution to book, search & recreate your favourite products & services.
          </p>
          <p className="col-lg-8 mx-auto fs-5 text-muted">Sign In as</p>
          <div className="d-inline-flex gap-2 mb-5">
            <button className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button" onClick={userButton}>
              User
              <svg className="bi ms-2" width="24" height="24">
                <use xlinkHref="#arrow-right-short"></use>
              </svg>
            </button>
            <button className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button" onClick={serviceProviderButton}>
              Service Provider
              <svg className="bi ms-2" width="24" height="24">
                <use xlinkHref="#arrow-right-short"></use>
              </svg>
            </button>
            <button className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button" onClick={shopKeeperButton}>
              Shopkeeper
              <svg className="bi ms-2" width="24" height="24">
                <use xlinkHref="#arrow-right-short"></use>
              </svg>
            </button>
            <button className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button" onClick={serviceMenButton}>
              Servicemen
              <svg className="bi ms-2" width="24" height="24">
                <use xlinkHref="#arrow-right-short"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>

    </>
  );
}

export default FirstPageComponent;
