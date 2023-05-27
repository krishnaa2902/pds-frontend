import React, { useState, useEffect } from "react";
import axios from "axios";

const FpsComponent = () => {
  const [name, setName] = useState("");
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



  const handleDeductGrains = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/deduct-grains-fci', { grains })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

    setName("");
    setGrains("");
  };
  
  const handleShowGrains = async () => {
    try {
      const response = await axios.get('http://localhost:3001/show-grains-fps' , {
        params: {
          name: name
        }
      });
      const fpsGrains = response.data.grains;
      setGrains(fpsGrains);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReadyToRequest = () => {
    axios.put('http://localhost:3001/fps-request', {name : name})
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  };



  return (
    <div className="miller-container">
      <h1>Fps Component</h1>
      <h2>Welcome {name}</h2>


      <button onClick={handleShowGrains}>Show Grains</button>
      <p>Grains: {grains}</p>
      <button onClick={handleReadyToRequest}>Request Grains from FCI</button>
    </div>
  );
};

export default FpsComponent;