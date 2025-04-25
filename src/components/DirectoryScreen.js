import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DirectoryScreen() {
  const navigate = useNavigate();
  const [directoryData, setDirectoryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || ''}/api/directory`)
      .then(res => res.json())
      .then(data => {
        setDirectoryData(data);
        setLoading(false);
        // Set default selected category to the first available category.
        const categories = Object.keys(data);
        if (categories.length > 0) {
          setSelectedCategory(categories[0]);
        }
      })
      .catch(err => {
        console.error("Failed to load directory data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="directory-container"><p>Loading directory...</p></div>;
  }

  // Get all category keys from the directory data.
  const categories = Object.keys(directoryData);
  // Get the data for the selected category.
  const selectedData = directoryData[selectedCategory] || [];

  return (
    <div className="directory-container">
      <h2>Biology Department Directory</h2>
      <button className="back-button" onClick={() => navigate('/')}>← Back to Home</button>
      
      {/* Dropdown to select the directory category */}
      <div className="dropdown-container">
        <label htmlFor="category-select">Select Category: </label>
        <select 
          id="category-select" 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="directory-section">
        <h3>{selectedCategory}</h3>
        <table className="directory-table">
          <thead>
            <tr>
              {selectedData.length > 0 &&
                Object.keys(selectedData[0]).map(field => (
                  <th key={field}>{field}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {selectedData.map((entry, index) => (
              <tr key={index}>
                {Object.values(entry).map((value, idx) => (
                  <td key={idx}>{value || ''}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DirectoryScreen;
