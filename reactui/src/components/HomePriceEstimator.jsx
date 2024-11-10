import React, { useState, useEffect } from 'react';
import './HomePriceEstimator.css';

const HomePriceEstimator = () => {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    total_sqft: '',
    bhk: '1',
    bath: '1',
    location: ''
  });
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    // For testing, using mock locations
    const mockLocations = [
      "Whitefield", "Electronic City", "JP Nagar", "Indira Nagar", 
      "Koramangala", "HSR Layout", "Marathahalli"
    ];
    setLocations(mockLocations);
  };

  const validateForm = () => {
    if (!formData.total_sqft) {
      setError('Please enter the total square feet');
      return false;
    }
    if (!formData.location) {
      setError('Please select a location');
      return false;
    }
    if (parseFloat(formData.total_sqft) <= 0) {
      setError('Square feet must be greater than 0');
      return false;
    }
    return true;
  };

  const handleEstimatePrice = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Mock API call for testing
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      const mockPrice = (
        parseFloat(formData.total_sqft) * 0.01 * 
        parseInt(formData.bhk) * 
        parseInt(formData.bath) * 
        (Math.random() * (100 - 50) + 50)
      ).toFixed(2);
      
      setEstimatedPrice(mockPrice);
    } catch (error) {
      setError('Error estimating price. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  return (
    <div className="estimator-container">
      <div className="estimator-card slide-in">
        <h1 className="estimator-title">Home Price Estimator</h1>
        
        <div className="form-group">
          <label>Area (Square Feet)*</label>
          <input
            type="number"
            name="total_sqft"
            value={formData.total_sqft}
            onChange={handleInputChange}
            placeholder="Enter total square feet"
            min="1"
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Number of Bedrooms (BHK)*</label>
          <div className="radio-group">
            {[1, 2, 3, 4, 5].map((num) => (
              <label key={num} className={`radio-label ${formData.bhk === num.toString() ? 'checked' : ''}`}>
                <input
                  type="radio"
                  name="bhk"
                  value={num}
                  checked={formData.bhk === num.toString()}
                  onChange={handleInputChange}
                />
                {num} BHK
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Number of Bathrooms*</label>
          <div className="radio-group">
            {[1, 2, 3, 4].map((num) => (
              <label key={num} className={`radio-label ${formData.bath === num.toString() ? 'checked' : ''}`}>
                <input
                  type="radio"
                  name="bath"
                  value={num}
                  checked={formData.bath === num.toString()}
                  onChange={handleInputChange}
                />
                {num} Bath
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Location*</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="select-field"
          >
            <option value="">Select location</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          onClick={handleEstimatePrice}
          disabled={loading}
          className={`estimate-button ${loading ? 'loading' : ''}`}
        >
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Estimating...
            </>
          ) : (
            'Estimate Price'
          )}
        </button>

        {estimatedPrice !== null && (
          <div className="result-container">
            <div className="result-label">Estimated Price</div>
            <div className="result-price">
              ₹ {parseFloat(estimatedPrice).toLocaleString('en-IN')} Lakh
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePriceEstimator;