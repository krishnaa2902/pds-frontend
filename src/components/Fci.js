import React, { useState, useEffect } from "react";
import axios from "axios";

const FciComponent = () => {
  const [millers, setMillers] = useState([]);
  const [fps,setfps]=useState([]);
  const [name, setName] = useState("");
  const [mname, setMname] = useState("");
  const [fpname, setFpname] = useState("");
  const [mgrains, setMgrains] = useState(0);
  const [fpgrains, setFpgrains] = useState(0);
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

  const fetchMillers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/show-millers');
      setMillers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMillers();
  }, []);

  const handleDeductGrains = (e) => {
    e.preventDefault();
    console.log("going to hiandle : " + mgrains);
    axios.post('http://localhost:3001/deduct-grains-Miller', {
      mname: mname,
      name: name,
      mgrains: mgrains 
    })
      .then(response => {
        console.log(response);
        fetchMillers();
      })
      .catch(error => {
        console.log(error);
      });

    setMname("");
  };

  const handleShowGrains = async () => {
    try {
      const response = await axios.get('http://localhost:3001/show-grains-FCI');
      const farmerGrains = response.data.grains;
      setGrains(farmerGrains);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchfps = async () => {
    try {
      const response = await axios.get('http://localhost:3001/show-fps');
      setfps(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchfps();
  }, []);

  const handleAcceptRequest = async () => {
    try {
      const response = await axios.post('http://localhost:3001/fci-accept-request', {
        fpname:fpname,
        name:name,
        fpgrains:fpgrains
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleDenyRequest = async () => {
    try {
      const response = await axios.post('http://localhost:3001/fci-deny-request', { fpname:fpname });
      console.log(response.data);
    } catch (error) {
      console.error('Error denying request:', error);
    }
  };



  return (
    <div className="miller-container">
      <h1>FCI Component</h1>
      
      <button onClick={fetchMillers}>Show all Millers</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Grains</th>
          </tr>
        </thead>
        <tbody>
          {millers.map((miller) => (
            <tr key={miller._id}>
              <td>{miller.name}</td>
              <td>{miller.location}</td>
              <td>{miller.grains}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleDeductGrains}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={mname}
            onChange={(e) => setMname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Grains to Deduct:</label>
          <input
            type="number"
            value={mgrains}
            onChange={(e) => setMgrains(e.target.value)}
            required
          />
        </div>
        <button type="submit">Deduct Grains</button>
      </form>
      <button onClick={handleShowGrains}>Show Grains</button>
      <p>Grains: {grains}</p>

      <button onClick={fetchfps}>Show all fps</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Grains</th>
          </tr>
        </thead>
        <tbody>
          {fps.map((hi) => (
            <tr key={hi._id}>
              <td>{hi.name}</td>
              <td>{hi.location}</td>
              <td>{hi.grains}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={fpname}
            onChange={(e) => setFpname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="grains">Grains:</label>
          <input
            type="number"
            id="grains"
            value={fpgrains}
            onChange={(e) => setFpgrains(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleAcceptRequest}>
          Accept Request
        </button>
        <button type="button" onClick={handleDenyRequest}>
          Deny Request
        </button>
      </form>

    </div>
  );
};

export default FciComponent;
