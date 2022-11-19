import React from 'react';
import { Navbar, Home, Settings, Swap, DashboardLayout, Pool, OldDeals, BondCenter, Profile } from "./components"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Navbar />
      <div><Toaster position="bottom-right" reverseOrder={false} /></div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {/* Dashboard Page Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Swap />} />
          <Route path="/dashboard/swap" element={<Swap />} />
          <Route path="/dashboard/pool" element={<Pool />} />
          <Route path="/dashboard/old-deals" element={<OldDeals />} />
          <Route path="/dashboard/board-center" element={<BondCenter/>} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
