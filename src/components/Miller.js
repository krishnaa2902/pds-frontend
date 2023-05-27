import React, { useState, useEffect } from "react";
import axios from "axios";

const MillerComponent = () => {
  const [farmers, setFarmers] = useState([]);
  const [name, setName] = useState("");
  const [fname,setFname] = useState("");
  const [grains, setGrains] = useState(0);

  useEffect(() => {
    const loggedInName = localStorage.getItem("name");
    const loggedInRole = localStorage.getItem("role");
    const loggedInAadhar = localStorage.getItem("aadhar");
    const loggedInLocation = localStorage.getItem("location");

    if (loggedInName) {
      setName(loggedInName);
    }
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/show-farmers');
      setFarmers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);



  const handleDeductGrains = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/deduct-grains-farmer', { fname, name ,  grains })
      .then(response => {
        console.log(response);
        fetchFarmers();
      })
      .catch(error => {
        console.log(error);
      });
    setFname("");
    setGrains("");
  };
  const handleReadyToSell = () => {
    axios.put('http://localhost:3001/miller-ready' , {
      name: name
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  };
  const handleNotReadyToSell = () => {
    axios.put('http://localhost:3001/miller-not-ready' , {
      name: name
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
      const response = await axios.get('http://localhost:3001/show-grains-miller' ,{
        params: {
          name: name
        }
      });
      const farmerGrains = response.data.grains;
      setGrains(farmerGrains);
    } catch (error) {
      console.error(error);
    }
  };




  return (
    <div className="miller-container">
      <h1>Miller Component</h1>
      <h2>Welcome {name}</h2>
      <button onClick={fetchFarmers}>Show all farmers</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Grains</th>
          </tr>
        </thead>
        <tbody>
          {farmers.map((farmer) => (
            <tr key={farmer._id}>
              <td>{farmer.name}</td>
              <td>{farmer.location}</td>
              <td>{farmer.grains}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleDeductGrains}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Grains to Deduct:</label>
          <input
            type="number"
            value={grains}
            onChange={(e) => setGrains(e.target.value)}
            required
          />
        </div>
        <button type="submit">Deduct Grains</button>
      </form>
      <button onClick={handleReadyToSell}>Ready to Sell</button>
      <button onClick={handleNotReadyToSell}>Remove from listing</button>
      <button onClick={handleShowGrains}>Show Grains</button>
      <p>Grains: {grains}</p>
    </div>
  );
};

export default MillerComponent;
