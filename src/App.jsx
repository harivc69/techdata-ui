import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './login';
import HomePage from './home';
import AddDetailsPage from '../src/components/addDetailsForm';
import ViewDetailsPage from '../src/components/viewDetailsPage';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/adddetails" element={<AddDetailsPage />} />
          <Route path='/viewdetails' element={<ViewDetailsPage />} />
       

          {/* You can set a default route (optional) */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
