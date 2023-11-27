//import React from "react";
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./pages/LoginPage/contexts/AuthContext";
// Import components from the first app
import ForgotPassword from "./pages/LoginPage/components/ForgotPassword";
import Login from "./pages/LoginPage/components/Login";
import PrivateRoute from "./pages/LoginPage/components/PrivateRoute";
import Signup from "./pages/LoginPage/components/Signup";
import UpdateProfile from "./pages/LoginPage/components/UpdateProfile";

// Import components from the second app
import './App.css';
import Header from "./components/Header";
import RocketAnimation from "./components/RocketAnimation";
import Sections from "./components/Sections";
import Gallery from "./pages/Gallery/Gallery";
import PictureOfDay from "./pages/PictureOfDay/PictureOfDay";
import WeatherOnMars from "./pages/WeatherOnMars/App";
import WildFireTracker from "./pages/WildFireTracker/WildFireTracker";

// HomePage component from the second app
function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Sections />
      </header>
    </div>
  );
}

// RocketAwareRouter component from the second app


function RocketAwareRouter() {
  const [showAnimation, setShowAnimation] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show the rocket animation
    setShowAnimation(true);

    // Hide the rocket animation
    const timer = setTimeout(() => setShowAnimation(false), 300); // Adjust the duration as needed

    // Cleanup the timer 
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {showAnimation && <RocketAnimation />}
      {/* Rest of your components */}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
      <RocketAwareRouter /> 
            <Routes>
              {/* Adjusted to have HomePage as the default route */}
              <Route path="/" element={<Login />} />
              
              <Route path="/update-profile" element={<PrivateRoute component={UpdateProfile} />} />
              <Route path="/signup" element={<Signup />} />
             
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Routes from the second app */}
              <Route path="/home" element={<PrivateRoute component={HomePage} />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/pictureofday" element={<PictureOfDay />} />
              <Route path="/weatheronmars" element={<WeatherOnMars />} />
              <Route path="/wildfiretracker" element={<WildFireTracker />} />

              {/* Existing PrivateRoute for Dashboard can be removed or repurposed if needed */}
              {/* <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} /> */}
            </Routes>
            
          
      </AuthProvider>
    </Router>
  );
}


export default App;
