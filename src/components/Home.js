import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
function Home() {
    return ( 
        <div>
            <h1>Home</h1>
            <NavLink to="/Signup">Signup</NavLink>
            <NavLink to="/Login">Login</NavLink>
            
        </div>
     );
}

export default Home;