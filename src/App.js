
import Signup from "./components/Signup.js";
import Fci from "./components/Fci.js";
import Login from "./components/Login.js";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Farmer from "./components/Farmer.js";
import Miller from "./components/Miller.js";
import Fps from "./components/Fps.js";
import Home from "./components/Home.js";
function App() {

  return (
    <div>
      {/* <Fci /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Signup" element={<Signup/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Fci" element={<Fci />} />
          <Route path="/Farmer" element={<Farmer />} />
          <Route path="/Miller" element={<Miller />} />
          <Route path="/Fps" element={<Fps />} />
          {/* <Route path="/Login" element={<Login/>} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
