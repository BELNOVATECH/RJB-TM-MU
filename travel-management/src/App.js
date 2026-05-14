// App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

// (Optional future pages)
// import Dashboard from "./pages/Dashboard";
// import Vehicles from "./pages/Vehicles";
// import Accommodation from "./pages/Accommodation";
// import Pricing from "./pages/Pricing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* 🏠 Home Page */}
        <Route path="/" element={<Home />} />

        {/* 🔜 Future Routes */}
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/pricing" element={<Pricing />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;