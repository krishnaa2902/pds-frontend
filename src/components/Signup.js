import React, { useState, useEffect } from 'react';
import "./styles.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
function Signup() {
    const [role,setRole] = useState("");
    const [isVisible,setIsVisible] = useState(false);
    // const [sname,setSName] = useState("");
    // const [srole,setSRole] = useState("");
    // const [spassword,setSPassword] = useState("");
    // const [saadhar,setSAadhar] = useState("");
    // const [slocation,setSLocation] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();
        console.log("SDfs");
        console.log("target: " + e.target.role.value);
        var obj;
        if(e.target.role.value === "Fci") {
          // setSName("Fci");
          // setSRole(e.target.role.value);
          // setSPassword(e.target.pwd.value);
          const sname = "Fci";
          const srole = e.target.role.value;
          const spassword = e.target.pwd.value;
          const saadhar = "0000000000";
          const slocation = "Delhi";
          const sgrains = 0;
          const sready = 0;
          console.log({ sname, srole, spassword ,saadhar , slocation , sgrains , sready });
          axios.post('http://localhost:3001/signup',  {sname, srole, spassword  , saadhar, slocation , sgrains , sready} )
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
            // obj = {
            //     role:e.target.role.value,
            //     name:"Fci",
            //     password:e.target.pwd.value
            // }

        }
        else {
          const sname = e.target.name.value;
          const srole = e.target.role.value;
          const spassword = e.target.pwd.value;
          const saadhar = e.target.aadhar.value;
          const slocation = e.target.location.value;
          const sgrains = 0;
          const sready = 0;
          console.log({ sname, srole, spassword ,saadhar , slocation , sgrains , sready });
          axios.post('http://localhost:3001/signup',  {sname, srole, spassword  , saadhar, slocation , sgrains , sready} )
          .then(response => {
            window.location.replace('/Login');
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
        }
        
      };
    
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

    return (
        <div className="container">
          <h2 className="title">Signup Page</h2>
          <form onSubmit={handleSignup}>
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
                    <label className="label" htmlFor="name">Enter name:</label>
                    <input className="input" type="text" name="name" placeholder="Enter name"/>

                    <label className="label" htmlFor="aadhar">Enter aadhar number:</label>
                    <input className="input" type="text" name="aadhar" placeholder="Enter aadhar number"/>

                    <label className="label" htmlFor="location">Enter location:</label>
                    <input className="input" type="text" name="location" placeholder="Enter location"/>
                </div>
                <label className="label" htmlFor="pwd">Enter password:</label>
                <input className="input" type="password" name="pwd" placeholder="Enter password"/>
              {/* {role}{isVisible?<div>true</div>:<div>false</div>} */}
              <input type="submit" value="Signup"/>
            </div>
          </form>
          <div className="form-group">
              <button className="button" ><NavLink to="/Login" className="nav-link">Already have an account?</NavLink></button>
            </div>
        </div>
      );      
}
export default Signup;