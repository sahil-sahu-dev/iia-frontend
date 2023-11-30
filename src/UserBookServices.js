import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function UserBookServicesComponent() {
  return (
    <div className="App">
      <ServiceForm />
    </div>
  );
}


function ServiceForm() {
  const [serviceName, setServiceName] = useState('');
  const [maxCost, setMaxCost] = useState('');
  const [maxDistance, setMaxDistance] = useState('');
  const [minExperience, setMinExperience] = useState('');
  const [serviceList, setServiceList] = useState([]); // Added state to store the list of services

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!serviceName) {
      alert("Please select a service name.");
      return;
    }
  
    // Construct URL with the appropriate endpoint
    const url = new URL(`http://localhost:5002/get-services/${serviceName.toLowerCase()}`);
  
    // Construct query parameters
    const params = new URLSearchParams();
    if (maxCost) params.append('cost', maxCost);
    if (maxDistance) params.append('max_dist', maxDistance);
    // Add lat and lon parameters as needed
    params.append('lat', 28.655919);
    params.append('lon', 76.92984);
  
    // Append query parameters to URL
    url.search = params;
  
    try {
      const response = await fetch(url, { method: 'GET', mode: 'cors' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      else {
        const data = await response.json();
        console.log(data);
        setServiceList(data); // Assuming the API response is the list of services
      }
    } catch (error) {
      console.error("There was an error fetching the services", error);
      // Handle the error e.g., set an error state, show a notification, etc.
    }
  };

  const handleBook = async (provider) => {
    // Replace these with the actual user_id and service_provider_id
    const userId = 1; // The ID of the user who is booking the service
    const serviceProviderId = provider.id; // The ID of the service provider being booked
    
    const bookingData = {
      user_id: userId,
      service_provider_id: serviceProviderId,
      service_name: serviceName
    };
  
    try {
      const response = await fetch('http://localhost:5008/pending_booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      alert('Your booking has been initiated');
      // Additional logic to handle the result, such as updating state or UI
    } catch (error) {
      console.error("There was an error processing the booking", error);
      // Handle the error e.g., set an error state, show a notification, etc.
    }
  };


  return (
    <div className="container my-4">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <form onSubmit={handleSubmit} className="my-5">
          <h3 className="text-center mb-4">Search for a Service</h3>
          <div className="mb-3">
            <label htmlFor="service" className="form-label">Service Name:</label>
            <div className="d-flex flex-wrap gap-2">
              {["Welder", "Carpenter", "Mechanic", "Housekeeper", "Barber", "Electrician"].map(service => (
                <div key={service} className="form-check">
                  <input className="form-check-input" type="radio" name="serviceName" id={service} value={service} onChange={(e) => setServiceName(e.target.value)} />
                  <label className="form-check-label" htmlFor={service}>{service}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="maxCost" className="form-label">Max Cost:</label>
            <input type="number" className="form-control" id="maxCost" value={maxCost} onChange={(e) => setMaxCost(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="maxDistance" className="form-label">Max Distance:</label>
            <input type="number" className="form-control" id="maxDistance" value={maxDistance} onChange={(e) => setMaxDistance(e.target.value)} />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
    <div className="row justify-content-center mt-4">
      <div className="col-md-8">
        {serviceList.length > 0 && (
          <ul className="list-group">
            {serviceList.map((service, index) => ( // Make sure to use a unique key for each item, index is used here for simplicity
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-bold">{service.name}</div>
                  <div>Phone: {service.phone}</div>
                  <div>Email: {service.email}</div>
                  <div>Cost: ${service.service_cost}</div>
                </div>
                <button type="button" onClick={() => handleBook(service)} className="btn btn-primary">Book</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </div>
  );
  
}

export default UserBookServicesComponent;