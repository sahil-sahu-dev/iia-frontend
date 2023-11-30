import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from './logo.png'
import UserLoginComponent from './UserLoginComponent'
import UserHomePageComponent from './UserHomePageComponent'
import FirstPageComponent from  './FirstPage.js'
import UserBookServicesComponent from './UserBookServices.js'
import ServiceProviderLoginComponent from './ServiceProviderLogin.js'
import ServiceProviderHomePageComponent from './ServiceProviderHomePage.js'
import ServiceProviderBookingComponent from './ServiceProviderBookings.js'
import ShopKeeperLoginComponent from './ShopkeeperLogin.js'
import ShopKeeperHomePageComponent from './ShopkeeperHomePage.js'
import ServiceProviderDataSourceComponent from './ServiceProviderDataSource.js'
import CatalogueComponent from './UserCatalogue.js'
import ServiceMenLoginComponent from './ServiceMenLogin.js'
import ServiceMenHomePageComponent from './ServiceMenHome.js'
import ServiceMenBookingsComponent from './ServiceMenBookings.js'
import CatalogComponent from './UserCatalogue.js'
import ItemSearch from './SearchItems.js';
import BookingHistory from './UserBookingHistory.js';

const App = ()=>{

  return(
    <Router>
      <Routes>
        <Route path="/" element={<FirstPageComponent />}></Route>
        <Route path="/userLogin" element={<UserLoginComponent />}></Route>
        <Route path="/userHome" element={<UserHomePageComponent />}></Route>
        <Route path="/userBookServices" element={<UserBookServicesComponent />}></Route>
        <Route path="/serviceProviderLogin" element={<ServiceProviderLoginComponent />}></Route>
        <Route path="/serviceProviderHome" element={<ServiceProviderHomePageComponent />}></Route>
        <Route path="/serviceProviderBookings" element={<ServiceProviderBookingComponent />}></Route>
        <Route path="/shopkeeperLogin" element={<ShopKeeperLoginComponent />}></Route>
        <Route path="/shopkeeperHome" element={<ShopKeeperHomePageComponent />}></Route>
        <Route path="/serviceProviderDataSource" element={<ServiceProviderDataSourceComponent />}></Route>
        <Route path="/userCatalogue" element={<CatalogComponent />}></Route>
        <Route path="/searchItems" element={<ItemSearch />}></Route>
        <Route path="/bookingHistory" element={<BookingHistory />}></Route>
        <Route path="/serviceMenLogin" element={<ServiceMenLoginComponent />}></Route>
        <Route path="/serviceMenHome" element={<ServiceMenHomePageComponent />}></Route>
        <Route path="/serviceMenBookings" element={<ServiceMenBookingsComponent />}></Route>

      </Routes>
    </Router>
  );
}

export default App;
