import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./app.css"
import {
  AppWrapper,
  GlobalStyle,
  InfoWrapper,
  MarsWeather,
} from './WeatherOnMars1.styles';
import { API_URL } from './api';
import Info from './components/Info';
import Previous from './components/Previous';
import Unit from './components/Unit';
import WeatherData from './components/WeatherData';
import { formatDate } from './helpers';
import BGImage from './mars.jpg';


const App = () => {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState([]);
  const [selectedSol, setSelectedSol] = useState();
  const [metric, setMetric] = useState(true);
  const [previous, setPrevious] = useState(false);
  console.log(weather);

  useEffect(() => {
    const fetchFromAPI = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const weatherData = await response.json();
        console.log('Fetched weather data:', weatherData);

        const solKeys = weatherData.sol_keys  || [];
        const marsWeather = solKeys.map((solKey) => {
          return {
            sol: solKey,
            maxTemp: weatherData[solKey]?.AT?.mx || 'No data',
            minTemp: weatherData[solKey]?.AT?.mn || 'No data',
            windSpeed: Math.round(weatherData[solKey]?.HWS?.av || 0),
            windDirectionDegrees:
              weatherData[solKey]?.WD?.most_common?.compass_degrees || 0,
            date: formatDate(new Date(weatherData[solKey]?.First_UTC)),
          };
        });

      console.log('Processed weather data:', marsWeather);

        setWeather(marsWeather);
        setSelectedSol(marsWeather.length - 1);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state or retry logic if needed
      }
    };

    fetchFromAPI();
  }, []);

  const navigate = useNavigate(); 
  const goHome = () => {
    navigate('/home'); // This will navigate back to the Home page
  };

  return (
    <>
    <button className="homeButton" onClick={goHome}>STAR</button>
      <GlobalStyle bgImage={BGImage} />
      <AppWrapper>
        <MarsWeather>
          {loading ? (
            <div>Loading ...</div>
          ) : (
            <>
              <h1 className='main-title'>
                Latest weather at Elysium Plantitia
              </h1>
              <WeatherData sol={weather[selectedSol] || {}} isMetric={metric} />
              <InfoWrapper>
                <Info />
                <Unit metric={metric} setMetric={setMetric} />
              </InfoWrapper>
            </>
          )}
        </MarsWeather>
        <Previous
          weather={weather}
          previous={previous}
          setPrevious={setPrevious}
          setSelectedSol={setSelectedSol}
          isMetric={metric}
        />
      </AppWrapper>
    </>
  );
};

export default App;