import React, { useState, useEffect } from 'react';

import "./styles.css";
import axios from 'axios';
import { NavLink } from "react-router-dom";
function Login() {
  const [isVisible,setIsVisible] = useState(false);

  const [role,setRole] = useState("");
    function handleVisibility(e) {
      setRole(e.target.value);
      console.log(role);
      var currRole = e.target.value;
      if( currRole === "Fci" || currRole === "") {
        setIsVisible(false);
      }
      else {
        setIsVisible(true);
      }
      // <NavLink to=data ></NavLink>
    }

    function handleLogin(e) {
      e.preventDefault();
      var data;
      if(e.target.role.value === "Fci") {
        data = {
          role: e.target.role.value,
          password: e.target.pwd.value
        }
      }
      else {
        data = {
          role: e.target.role.value,
          aadhar: e.target.aadhar.value,
          password: e.target.pwd.value
        }
      }
      console.log(data);
      axios.post('http://localhost:3001/login', { data })
          .then(response => {
            console.log("login success");
            console.log(data.name);
            localStorage.setItem('name',response.data.name);
            localStorage.setItem('role',response.data.role);
            localStorage.setItem('aadhar',response.data.aadhar);
            localStorage.setItem('location',response.data.location);
            window.location.replace('/'+response.data.role);
            console.log("res = "+ JSON.stringify(response.data));

          })
          .catch(error => {
            console.log("login failure");
            console.log(error);
          });

        // <NavLink to=data ></NavLink>
    }

    return (
        <div className="container">
          <h2 className="title">Login Page</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="label" htmlFor="role">Your role:</label>
              <select id="role" className="input" value={role} onChange={handleVisibility}>
                <option value="">Select role</option>
                <option value="Farmer">Farmer</option>
                <option value="Miller">Miller</option>
                <option value="Fci">FCI</option>
                <option value="Fps">FPS</option>
              </select>
              <div className={isVisible ?'undefined':'hidden'}>
                <label htmlFor="aadhar">Aadhar number</label>
                <input type="text" name="aadhar" placeholder="Enter Aadhar number"/>
              </div>
              <label htmlFor="pwd">Password</label>
              <input type="password" name="pwd" placeholder="Enter password"/>
              <input type="submit" value="Login"/>
            </div>
          
            <div className="form-group">
              <button className="button" ><NavLink to="/Signup" className="nav-link">Dont have an account?</NavLink></button>
            </div>
          </form>
        </div>
      );      
}

export default Login;