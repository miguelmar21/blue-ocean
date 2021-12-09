import React, {useState} from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import mapStyle from "./mapStyle";


const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = withScriptjs(
  withGoogleMap((props) => {
    const [markers, setMarkers] = useState([]);

    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 27.522628, lng: -99.489061 }}
        options={options}
        onClick={(event) => {
          setMarkers([...markers, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date
          }])
        }}
      >
        {props.isMarkerShown && (
          <Marker position={{ lat: 27.522628, lng: -99.489061 }} />
        )}
      </GoogleMap>
    );
  })
);

export default Map;

//event OnClick gives you the longitude latitude