import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ItemSearch() {
  const [searchParams, setSearchParams] = useState({
    item_category: '',
    item_type: '',
    item_size: '',
    item_name: '',
    item_brand: '',
    item_max_price: '',
    lat: '28.655919',
    lon: '76.92984',
    max_dist: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('electrical'); // Default search type

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchResults([]); // Clear results when changing search type
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const queryString = Object.entries(searchParams)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
      const response = await fetch(`http://localhost:5001/items/${searchType}?${queryString}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      console.log(data);

      setSearchResults(data);
    } catch (error) {
      console.error("Error during the search", error);
    }
  };

  const renderResultsTable = () => {
    return (
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Category</th>
            <th scope="col">Type</th>
            <th scope="col">Size</th>
            <th scope="col">Name</th>
            <th scope="col">Brand</th>
            <th scope="col">Price</th>
            <th scope="col">Store Name</th>
            <th scope="col">Store Latitude</th>
            <th scope="col">Store Longitude</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((item, index) => (
            <tr key={item.item_id || index}>
              <th scope="row">{index + 1}</th>
              <td>{item.item_category || 'NA'}</td>
              <td>{item.item_type || 'NA'}</td>
              <td>{item.item_size|| 'NA'}</td>
              <td>{item.item_name|| 'NA'}</td>
              <td>{item.item_brand|| 'NA'}</td>
              <td>{item.item_price|| 'NA'}</td>
              <td>{item.store_name|| 'NA'}</td>
              <td>{item.store_lat|| 'NA'}</td>
              <td>{item.store_long|| 'NA'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Item Search</h1>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="searchType"
              id="electrical"
              value="electrical"
              checked={searchType === 'electrical'}
              onChange={handleSearchTypeChange}
            />
            <label className="form-check-label" htmlFor="electrical">
              Electrical
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="searchType"
              id="furniture"
              value="furniture"
              checked={searchType === 'furniture'}
              onChange={handleSearchTypeChange}
            />
            <label className="form-check-label" htmlFor="furniture">
              Furniture
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="searchType"
              id="general-hardware"
              value="general-hardware"
              checked={searchType === 'general-hardware'}
              onChange={handleSearchTypeChange}
            />
            <label className="form-check-label" htmlFor="general-hardware">
              General Hardware
            </label>
          </div>
        </div>

        <div className="row g-3 align-items-center mb-3">
          <div className="col-auto">
            <label htmlFor="item_category" className="col-form-label">Category:</label>
          </div>
          <div className="col-auto">
            <input type="text" id="item_category" name="item_category" className="form-control" value={searchParams.item_category} onChange={handleInputChange} />
          </div>

          <div className="col-auto">
            <label htmlFor="item_type" className="col-form-label">Type:</label>
          </div>
          <div className="col-auto">
            <input type="text" id="item_type" name="item_type" className="form-control" value={searchParams.item_type} onChange={handleInputChange} />
          </div>

          <div className="col-auto">
            <label htmlFor="item_size" className="col-form-label">Size:</label>
          </div>
          <div className="col-auto">
            <input type="text" id="item_size" name="item_size" className="form-control" value={searchParams.item_size} onChange={handleInputChange} />
          </div>

          <div className="col-auto">
            <label htmlFor="item_name" className="col-form-label">Name:</label>
          </div>
          <div className="col-auto">
            <input type="text" id="item_name" name="item_name" className="form-control" value={searchParams.item_name} onChange={handleInputChange} />
          </div>

          <div className="col-auto">
            <label htmlFor="item_brand" className="col-form-label">Brand:</label>
          </div>
          <div className="col-auto">
            <input type="text" id="item_brand" name="item_brand" className="form-control" value={searchParams.item_brand} onChange={handleInputChange} />
          </div>

          <div className="col-auto">
            <label htmlFor="item_max_price" className="col-form-label">Max Price:</label>
          </div>
          <div className="col-auto">
            <input type="number" id="item_max_price" name="item_max_price" className="form-control" value={searchParams.item_max_price} onChange={handleInputChange} />
          </div>
          <div className="col-auto">
            <label htmlFor="max_dist" className="col-form-label">Max Distance:</label>
          </div>
          <div className="col-auto">
            <input type="number" id="max_dist" name="max_dist" className="form-control" value={searchParams.max_dist} onChange={handleInputChange} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      {searchResults && searchResults.length > 0 && renderResultsTable()}
    </div>
  );
}

export default ItemSearch;