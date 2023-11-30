import React, { useState, useEffect } from 'react';
import './Catalogue.css';

function CatalogComponent() {
    const [catalogItems, setCatalogItems] = useState([]);
    const [details, setDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState('');

    // Fetch the catalogue on component mount
    useEffect(() => {
        fetchCatalogue();
    }, []);


    // Function to fetch the entire catalogue
    const fetchCatalogue = () => {
        setIsLoading(true);
        setError(null);

        fetch('http://localhost:5007/catalogue')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setCatalogItems(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching catalogue:', error);
                setError(error.message);
                setIsLoading(false);
            });
    };

    // Function to fetch details for a specific item by ID
    const getDetails = (item) => {
        setIsLoading(true);
        setError(null);

        const id = item.id;
        setSelectedItem(item.description);
        console.log(item);

        fetch(`http://localhost:5007/catalogue/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                
                setDetails(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching details:', error);
                setError(error.message);
                setIsLoading(false);
            });
    };

    const renderProductsTable = (products, title) => {
        return (
            <>
                <h3>{title}</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Category</th>
                            <th scope="col">Type/Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Size</th>
                            <th scope='col'>Store Name</th>
                            <th scope='col'>Store Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.flat().map((item, index) => (
                            <tr key={item.item_id}>
                                <td>{index + 1}</td>
                                <td>{item.item_brand}</td>
                                <td>{item.item_category}</td>
                                <td>{item.item_type || item.item_name}</td>
                                <td>{item.item_price}</td>
                                <td>{item.item_size || 'N/A'}</td>
                                <td>{item.store_name}</td>
                                <td>Lat: {item.store_lat} Long: {item.store_long}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    };

    const handleBook = async (service, provider) => {
        // Replace these with the actual user_id and service_provider_id
        const userId = 1; // The ID of the user who is booking the service
        const serviceProviderId = provider.id; // The ID of the service provider being booked
    
        console.log(service)
        
        const bookingData = {
          user_id: userId,
          service_provider_id: serviceProviderId,
          service_name: service.service_name
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

      const renderServicesTable = (services, title) => {
        let sNo = 1; // Initialize serial number
        return (
          <>
            <h3>{title}</h3>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Provider</th>
                  <th scope="col">Cost</th>
                  <th scope="col">Contact</th>
                  <th scope='col'>Location</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {services && services.map((service) =>
                  service.service_provider.map((provider, providerIndex) => (
                    <tr key={`${service.service_name}-${provider.id}`}>
                      <td>{sNo++}</td>
                      <td>{service.service_name}</td>
                      <td>{provider.name}</td>
                      <td>{provider.service_cost}</td>
                      <td>{provider.phone}</td>
                      <td>Lat: {provider.lat} , Long: {provider.lon}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleBook(service, provider)}
                        >
                          Book
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        );
      };
      


    

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">Catalogue</h1>
            <div className="catalog-list">
                {catalogItems.map((item) => (
                    <div key={item.id} className="catalog-item">
                        <div className="catalog-image-container">
                            <img src={item.image} alt={item.description} className="catalog-image" />
                        </div>
                        <div className="catalog-details">
                            <h2 className="catalog-description">{item.description}</h2>
                            <button
                                className="catalog-button"
                                onClick={() => getDetails(item)}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Loading...' : 'Get Details'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedItem && <h2 className="details-title">{selectedItem}</h2>}
            {error && <div className="alert alert-danger">{error}</div>}
            {details && (
                <div className="details-section">
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {details && (
                    <div className="details-section w-100">
                        {details.electrical && details.electrical.length > 0 && renderProductsTable(details.electrical, 'Electrical')}
                        {details.furniture && details.furniture.length > 0 && renderProductsTable(details.furniture, 'Furniture')}
                        {details.generalHardware && details.generalHardware.length > 0 && renderProductsTable(details.generalHardware, 'General Hardware')}
                        {details.services && details.services.length > 0 && renderServicesTable(details.services, 'Services')}
                    </div>
                )}
                </div>
            )}
        </div>
    );
}

export default CatalogComponent;