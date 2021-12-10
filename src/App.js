import React from "react";
import axios from "axios";
import Map from "./Map/Map";
import API_KEY from '../config'

function App() {
  return (
    <div>
      <Map
        isMarkerShown
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default App;
