import React, { useState, useEffect } from 'react';
import './PictureOfDay.css';

//Please replace with your NASA API Key, visit https://api.nasa.gov/ when developing locally.

const API_KEY = 'BjJfdoquyADlmzW9ez1Q0CPq5bzz6BPDTaabSWeN' 

function PictureOfDay() {

  //here we are testing if the function PictureOfDay is running
  console.log("Rendering PictureOfDay component");

  //useState is a React Hook, it is used to manage state in a functional component
  //useState returns an array with two elements, the first is the state variable and 
  //the second is a function to update the state variable
  //here we are initializing the state variable data with null

  //all the above means is that the 'data' variable will be null or empty until we update it with the 'setData' function
  //and give it a value
  const [data, setData] = useState(null);
  //useEffect is another React Hook, it is used to perform side effects in a functional component
  useEffect(() => {
    //if you'd like to change the background of the page or add a differnet background, uncomment or play around
    //with the line below
    //it gets the background color from the css file PictureOfDay.css and adds it to the body
   
    //document.body.classList.add('pictureofday-body');

   
    //here we are testing if useEffect is ran
    console.log("useEffect is running");

  //Quick tip I am using template literals `` not '' or "" because I want to use the variable API_KEY inside the string
  //fetch gets the data from the NASA API
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  //then we convert the data to json (json is a way data is formated that is easy to read and use (look up example of data before and after json)))
  .then(response => response.json())
  //then we update the state variable 'data' with the data we got from the NASA API now formatted as json
  .then(data => {
    //here we are testing if we got data from the NASA API
    console.log("Fetched data:", data);
    //here we are updating the state variable 'data' with the data we got from the NASA API
    setData(data);
  })
  //if there is an error we log it to the console
  .catch(error => console.log('error fetching picture of the day data from NASA API', error));
  //again if you'd like to change background, uncomment or play around with the line below
  return () => {
    //document.body.classList.remove('pictureofday-body');
  };
  //the empty array below means that useEffect will only run once when the component is first rendered
}, []);
//if data is null or empty we return Loading... to the screen
  if(!data) return <div>Loading...</div>;
  console.log("Rendering with data:", data);
  //if data is not null or empty we return the data to the screen
  return(
    //here we are returning the data and displaying it to the screen 
    <div className="picture-container">
      <img src={data.url} alt={data.title} className="picture-image" />
      <h1 className="picture-title">{data.title}</h1>
      <p className="picture-explanation">{data.explanation}</p>
    </div>
  );
}
//exporting the component PictureOfDay so it can be used in other files like App.js
export default PictureOfDay;
