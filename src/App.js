import React from "react";
import axios from "axios";
import Map from "./Map/Map";

function App() {
  return (
    <div>
      <Map
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBMyy9-eKn7PhXppZ9MnlKQrgXlDDdV6o0&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      <div className='hi'>
        <h2>Hi</h2>
      </div>
    </div>
  );
}

export default App;
