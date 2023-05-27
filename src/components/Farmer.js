import React, { useEffect, useState } from "react";
import axios from "axios";

const FarmerComponent = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [grains, setGrains] = useState(0);
  const [ready, setReady] =useState(0);
  useEffect(() => {
    const loggedInName = localStorage.getItem("name");
    const loggedInRole = localStorage.getItem("role");
    const loggedInAadhar = localStorage.getItem("aadhar");
    const loggedInLocation = localStorage.getItem("location");

    if (loggedInName) {
      setName(loggedInName);
      setLocation(loggedInLocation);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/add-farmer', {
      name: name,
      location: location,
      grains: grains,
      ready: 0
    })
  }
  const handleReadyToSell = () => {
    axios.put('http://localhost:3001/farmer-ready' , {
      name: name,
      location: location,
      grains: grains,
      ready: 0
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  };
  const handleNotReadyToSell = () => {
    axios.put('http://localhost:3001/farmer-not-ready' ,{
      name: name,
      location: location,
      grains: grains,
      ready: 0
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleShowGrains = async () => {
    try {
      const response = await axios.get('http://localhost:3001/show-grains-farmer', {
        params: {
          name: name,
          location: location,
          grains: grains,
          ready: 0
        }
      });
      const farmerGrains = response.data.grains;
      console.log(farmerGrains);
      setGrains(farmerGrains);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="farmer-container">
      <h1>Farmer Component</h1>
      <h3>Welcome {name}</h3>
      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <label>Grains:</label>
          <input
            type="number"
            value={grains}
            onChange={(e) => setGrains(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleReadyToSell}>Ready to Sell</button>
      <button onClick={handleNotReadyToSell}>Remove from listing</button>
      <button onClick={handleShowGrains}>Show Grains</button>
      <p>Grains: {grains}</p>
    </div>
);
};

export default FarmerComponent;