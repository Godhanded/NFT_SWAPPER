import React from 'react';
import { Navbar, Home, Settings, Swap, DashboardLayout, Pool, Showcase, BondCenter } from "./components"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* Dashboard Page Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Swap />} />
          <Route path="/dashboard/swap" element={<Swap />} />
          <Route path="/dashboard/pool" element={<Pool />} />
          <Route path="/dashboard/showcase" element={<Showcase />} />
          <Route path="/dashboard/board-center" element={<BondCenter/>} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
