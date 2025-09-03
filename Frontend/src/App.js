import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import {Toaster} from "react-hot-toast"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Employee from "./pages/Employee";
import Manager from "./pages/Manager";

function App() {
  return (
    <Router>
    
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee" element={<Employee />}>
          <Route index element={<h2>Welcome Employee</h2>} />
          <Route path="apply-leave" element={<h2>Apply Leave Page</h2>} />
          <Route path="holiday-list" element={<h2>Holiday List Page</h2>} />
          <Route path="leave-history" element={<h2>Leave History Page</h2>} />
        </Route>

        <Route path="/manager" element={<Manager />}>
          <Route index element={<h2>Welcome Manager</h2>} />
          <Route path="view-employee" element={<h2>View Employees Page</h2>} />
          <Route path="holiday-list" element={<h2>Holiday List Page</h2>} />
          <Route path="verifyleave" element={<h2>Employee Leave History Page</h2>} />
          <Route path="addemployee" element = {<h2>Add employee</h2>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
