import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sections from './components/Sections';
import Gallery from './pages/Gallery/Gallery';
import PictureOfDay from './pages/PictureOfDay/PictureOfDay';
import WeatherOnMars from './pages/WeatherOnMars/WeatherOnMars';
import RocketAnimation from './components/RocketAnimation';
import './App.css';
import WildFireTracker from './pages/WildFireTracker/WildFireTracker';

//This is our home page, we load our Header and Sections components
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

//this function is a wrapper around the Router component
//it is used to detect when the user navigates to a new route
//and then it shows the rocket animation
//it is strictly used for the rocket animation
function RocketAwareRouter() {
  //the location tells us what route we are currently on
  //for example / or /gallery or /pictureofday...
  const location = useLocation();
  //showRocket is a state variable that tells us if we should show the 
  //rocket animation or not
  const [showRocket, setShowRocket] = useState(false);
  //target route is the route we want to navigate to
  //Target route is set when the user navigates to a new route
  const [targetRoute, setTargetRoute] = useState("/"); 

  useEffect(() => {
    //if the current route is not the same as the target route
    if (location.pathname !== targetRoute) {
      setShowRocket(true); //Shows the rocket animation

      //after 750 milliseconds we hide the animation and set the target route
      //to the current route
      //this is done so that the animation can play
      //if we set the target route to the new route immediately
      //the animation will not play
      const timer = setTimeout(() => {
        setShowRocket(false); //Hides the animation
        setTargetRoute(location.pathname);//Sets the target route 
      }, 750);
      //this is a cleanup function that is called when the component is unmounted
      //this is done so that we don't have multiple timers running at the same time
      return () => clearTimeout(timer);
    }
    
  }, 
  //this is a dependency array
  //it tells us when to run the useEffect function
  //in this case we want to run the useEffect function when the location.pathname or targetRoute changes
  [location.pathname, targetRoute]);


  return (
    <div className="AppContainer">
      {/* if showRocket is true we show the RocketAnimation component */}
      {showRocket && <RocketAnimation />}
      {/* we are returning the Router component */}
      <Routes>
        {/* we are returning the HomePage component when the route is / */}
        {/* we are returning the Gallery component when the route is /gallery */}
        {/* ... */}
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/pictureofday" element={<PictureOfDay />} />
        <Route path="/weatheronmars" element={<WeatherOnMars />} />
        <Route path="/wildfiretracker" element={<WildFireTracker />} />
      </Routes>
    </div>
  );
}


function App() {
  return (
    //we are returning the RocketAwareRouter component
    //because we want to show the rocket animation when the user navigates to a new route
    <Router>
      <RocketAwareRouter />
    </Router>
  );
}

export default App;
