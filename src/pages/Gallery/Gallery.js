//useEffect is a React hook that runs once after the first render of the component.
//It is used to perform side effects in a functional component.
//It takes two arguments, the first is a function that runs after the first render of the component.
//useState is a React hook that is used to manage state in a functional component.
//It takes one argument, the initial value of the state variable.
//It returns an array with two elements, the first is the state variable and the second is a function to update the state variable.
import React, { useEffect, useState } from 'react';
//DatePicker is a React component that is used to select dates.
//It is used in this component to select dates to search for images.
import DatePicker from 'react-datepicker';
//This is the css file for the DatePicker component.
import "react-datepicker/dist/react-datepicker.css";
//This is a React hook that is used to detect when an element is in view.
//It is used in this component to detect when the Load More button is in view.
import { useInView } from 'react-intersection-observer';
import backgroundVideo from './Background.mp4';
import './Gallery.css';
//useNavigate is a React hook that is used to navigate to different routes.
//It is used in this component to navigate back to the Home page.
import { useNavigate } from 'react-router-dom';

//This is the API key for the NASA API.
const My_Key_NASA = "9KgNPv3eqoV2NzQcQtB5l36pN8pFM8Dqh63y76rb";

//This is the Gallery component. It is used to display images from the NASA API.
function Gallery() {
  //here we are testing if the function Gallery is running
  //items is a state variable that is used to store the images from the NASA API
  //setItems is a function that is used to update the state variable items
  //useState is a React hook that is used to manage state in a functional component
  //useState returns an array with two elements, the first is the state variable and the second is a function to update the state variable
  const [items, setItems] = useState([]);
  //selectedCard is a state variable that is used to track the selected card
  //setSelectedCard is a function that is used to update the state variable selectedCard
  const [selectedCard, setSelectedCard] = useState(null);
  //isLoading is a state variable that is used to track if the data is loading to load more images
  //setIsLoading is a function that is used to update the state variable isLoading
  const [isLoading, setIsLoading] = useState(false);
  //startDate is a state variable that is used to track the selected date
  //setStartDate is a function that is used to update the state variable startDate
  const [startDate, setStartDate] = useState(null); 
  //loadCount is a state variable that is used to track the number of times the Load More button is clicked
  const [loadCount, setLoadCount] = useState(0); 
  //ref is a reference to the Load More button element
  const [ref, inView] = useInView({
    threshold: 0,
  });

  //State to track the favorite status 
const [favorites, setFavorites] = useState({});

//State to control whether to show favorite images or all images
const [showFavorites, setShowFavorites] = useState(false);

//Function to toggle the visibility of favorite images
const handleShowFavorites = () => {
  setShowFavorites(!showFavorites);
};

//Function to toggle the favorite status of an image
//Function to toggle the favorite status of an image
const toggleFavorite = (id) => {
  setFavorites((prevFavorites) => {
    const updatedFavorites = { ...prevFavorites };
    updatedFavorites[id] = !updatedFavorites[id];
    return updatedFavorites;
  });
};

  //useNavigate is a React hook that is used to navigate to different routes
  const navigate = useNavigate(); 
  //goHome is a function that is used to navigate back to the Home page
  const goHome = () => {
    navigate('/home'); // This will navigate back to the Home page
  };
 
  //getPastDates is a function that is used to generate dates for the initial load or based on selected date
  //startDate is the selected date
  //count is the number of dates to generate
  const getPastDates = (startDate, count) => {
    const dates = [];
    for (let i = 0; i < count; i++) {
      const date = new Date();
      date.setDate(startDate.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };
  
  //handleCardClick is a function that is used to handle the click event on an image card
  //index is the index of the image card
  const handleCardClick = (index) => {
    setSelectedCard(selectedCard === index ? null : index);
  };
  
  //shuffleArray is a function that is used to shuffle an array every time the user refreshes the page
  //array is the array to shuffle

  const shuffleArray = (array) => {
    // Fisher-Yates shuffle algorithm
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  //handleLoadMore is a function that is used to handle the click event on the Load More button
  //it is used to load more images
  const handleLoadMore = () => {
    setLoadCount(prevCount => prevCount + 1); // Increment load count to fetch more images
  };
  
  //useEffect is a React hook that is used to perform side effects in a functional component
  //It takes two arguments, the first is a function that runs after the first render of the component
  //and after every update to the state variable in the dependency array
  //The second argument is a dependency array, it tells us when to run the useEffect function
  //If the dependency array is empty, the useEffect function will only run once after the first render of the component
  //If the dependency array is not empty, the useEffect function will run after the first render of the component
  //and after every update to the state variable in the dependency array
  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);

      // Generate dates for the initial load or based on selected date
      const dates = startDate ? [startDate.toISOString().split('T')[0]] : getPastDates(new Date(), 30 + loadCount * 30);

      // Fetch images for each date
      const requests = dates.map((date) => {
        return fetch(`https://api.nasa.gov/planetary/apod?api_key=${My_Key_NASA}&date=${date}`)
          .then(response => response.json());
      });

      try {
        // Wait for all requests to resolve
        const data = await Promise.all(requests);
        const shuffledData = shuffleArray([...data]); // Shuffle the array
        setItems(prevItems => [...prevItems, ...shuffledData]); // Set shuffled data
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        // Reset loading state
        setIsLoading(false);
      }
    };
    // Call fetchImages function when the component is first rendered and after every update to the state variable startDate or loadCount
    // This will fetch images for the initial load or based on selected date
    fetchImages();
  }, [startDate, loadCount]); // This is the dependency array, it tells us when to run the useEffect function

//here we are testing if useEffect is ran
//here we are testing if we got data from the NASA API
//here we are updating the state variable 'data' with the data we got from the NASA API
const imagesToDisplay = showFavorites
  ? items.filter((_, index) => favorites[index])
  : items;
return (
  <div className="Gallery">
    <video autoPlay loop muted playsInline className="background-video">
      <source src={backgroundVideo} type="video/mp4" />
    </video>
    <h1 className='Title'>Gallery</h1>

    <button className="home-button" onClick={goHome}>STAR</button>

    <div className="date-picker-container">
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setItems([]); // Clear current items
          setStartDate(date);
        }}
        isClearable
        placeholderText="Search by date"
      />
    </div>
    
    {imagesToDisplay.map((image, index) => (
      <img 
        src={image.src} 
        alt={image.alt} 
        key={index} 
        onClick={() => toggleFavorite(index)} // Add an onClick handler to toggle favorite status
      />
    ))}
    
    {/* Add the "Show Favorites" button */}
    <button onClick={handleShowFavorites} className="show-favorites-button">
      {showFavorites ? 'Show All' : 'Show Favorites'}
    </button>

    <div className="image-gallery">
        {items
          .filter((item) => !showFavorites || favorites[item.date])
          .map((item) => (
            <div key={item.date} className={`image-card${selectedCard === item.date ? ' selected' : ''}`} onClick={() => handleCardClick(item.date)}>
              <img src={item.url} alt={item.title} />
              {/* Animated heart button */}
              <button className={`favorite-button${favorites[item.date] ? ' active' : ''}`} onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(item.date);
              }}>
                <span className="heart"></span>
              </button>
              <div className="card-title">{item.title}</div>
              <div className={`card-info${selectedCard === item.date ? ' show' : ''}`}>
                <p>{item.explanation}</p>
              </div>
            </div>
          ))}
      </div>
      <div ref={ref}></div>
      {inView && (
        <button onClick={handleLoadMore} className="load-more-button" disabled={isLoading}>
          {isLoading ? (
            <span className="loading-text">Loading...</span>
          ) : (
            "Load More"
          )}
        </button>
      )}
    </div>
);
  
}

export default Gallery;