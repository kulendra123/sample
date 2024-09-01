import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './DropdownForm.css';

function DropdownForm() {
  const options1 = [
    { value: 'Tier-1', label: 'Tier-1' },
    { value: 'Tier-2', label: 'Tier-2' },
    { value: 'Tier-3', label: 'Tier-3' },
  ];

  const options2 = [
    { value: 'pub-sub', label: 'pub-sub' },
    { value: 'microservices', label: 'microservices' },
    { value: 'circuit breaker', label: 'circuit breaker' },
  ];

  const multiSelectOptions = [
    { value: 'virtual machine', label: 'virtual machine' },
    { value: 'azure blob', label: 'azure blob' },
    { value: 'load balancer', label: 'load balancer' },

    { value: 'azure functions', label: 'azure functions' },
    { value: 'expressroute', label: 'expressroute' },
    { value: 'load balancer', label: 'load balancer' },

    { value: 'azure sql database', label: 'azure sql database' },
    { value: 'azure bastion', label: 'azure bastion' },
  ];

  

  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedMultiOptions, setSelectedMultiOptions] = useState([]);
  const [results, setResults] = useState([]);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("Dropdown 1 Value:", selectedOption1);
  //   console.log("Dropdown 2 Value:", selectedOption2);
  //   console.log("Multi-Select Dropdown Values:", selectedMultiOptions);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8800/search', {
        dropdown1: selectedOption1?.value,
        dropdown2: selectedOption2?.value,
        multiSelect: selectedMultiOptions.map((option) => option.value),
      });
      console.log("responsedata----")
      console.log(response.data)
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error occurred while searching.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label>Select Tier:</label>
          <Select
            options={options1}
            value={selectedOption1}
            onChange={setSelectedOption1}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Select Design Pattern:</label>
          <Select
            options={options2}
            value={selectedOption2}
            onChange={setSelectedOption2}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Select Azure Services:</label>
          <Select
            options={multiSelectOptions}
            isMulti
            value={selectedMultiOptions}
            onChange={setSelectedMultiOptions}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <div className="results-container">
        <h2>Search Results:</h2>
        {results.length > 0 ? (
          <div className="results-grid">
            {results.map((result, index) => (
              <div key={index} className="result-card">
                <h3>Result {index + 1}</h3>
                <p>Tier: {result.tier}</p>
                <p>Designpattern: {result.designPattern}</p>
                <p>Components: {result.component}</p>
                <p>SWC: {result.swc}</p>
                <p>SWCM: {result.swcm}</p>
                <p>Technology: {result.technology}</p>
                <p>Design Diagram: {result.designDiagram}</p>
                <p>Gitlab Url: {result.gitlabUrl}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No results found</p>
        )}
      </div>
      
    </div>
  );
}

export default DropdownForm;
