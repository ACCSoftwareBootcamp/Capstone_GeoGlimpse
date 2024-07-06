import React, { useEffect, useState } from "react";

function Maps() {
  const [str, setStr] = useState(null);
  const [place, setPlace] = useState('Seattle+WA');

  let url = 'http://localhost:3002/GoogleMaps'

  let API = 'AIzaSyA1u2rNLif_SR6WBSbtufuAOGa-OQ4dL1A'
  //test

  const handleChange = (event) => {
    // grab value from user input
    let newStr = event.target.value;
    console.log(newStr)
    setPlace(newStr.replace(" ", "+"));
  };

  // useEffect(
  //   function () {
      
  //       fetch(url)
  //         .then(function (response) {
  //           return response.json();
  //         })
  //         .then(function(data){
  //           console.log(data)
  //           setStr(data)
  //           console.log(data)
  //         })
  //         .catch(function(error){
  //           console.log(`There's an error and it says ${error}`)
  //         });
  //   },
  //   []
  // );

  // console.log(str)
  return (
    <div>
      <h2>Maps</h2>
      <div>
        <input 
          type="text" 
          placeholder="enter place"
        />
        <button>
          onClick={() => {
            handleChange()
          }}
        {/* onChange={handleChange} */}
        value={place}
        </button>
      </div>
        
      <iframe
        width="600"
        height="450"
        style={{ border:0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${API}
          &q=${place}`}>
      </iframe>
      {/* <iframe
        width="450"
        height="250"
        frameBorder="0" style={{ border:0 }}
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/directions?key=${API}
        &destination=Telemark+Norway
        &avoid=tolls|highways`}
        allowFullScreen>
      </iframe>
      <iframe
        width="600"
        height="450"
        style={{ border:0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/directions
  ?key=${API}
  &origin=Oslo+Norway
  &destination=Telemark+Norway
  &avoid=tolls|highways`}>
      </iframe> */}
      <iframe
  width="450"
  height="250"
  frameBorder="0" style={{ border:0 }}
  referrerPolicy="no-referrer-when-downgrade"
  src={`https://www.google.com/maps/embed/v1/directions?key=${str}&origin=Oslo+Norway
  &destination=Telemark+Norway
  &avoid=tolls|highways`}
  allowFullScreen>
</iframe>
    </div>
  );
}

export default Maps;
