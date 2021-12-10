import React, { useState, useEffect } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import mapStyle from "./mapStyle";

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

const defaultCenter = { lat: 27.522628, lng: -99.489061 };

const Map = withScriptjs(
  withGoogleMap((props) => {
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [panTo, setPanTo] = useState(null);

    const onMapClick = React.useCallback((event) => {
      setMarkers((currentMarkers) => [
        ...currentMarkers,
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date(),
        },
      ]);
    }, []);

    return (
      <div>
        <Search setPanTo={setPanTo}/>
        <GoogleMap
          defaultZoom={8}
          defaultCenter={defaultCenter}
          options={options}
          onClick={onMapClick}
          ref={(map) => map && panTo !== null && map.panTo(panTo)}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.time.toISOString()}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: "https://svg-clipart.com/svg/color/oLsCLwr-blue-musical-note-vector.svg",
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              onClick={() => setSelected(marker)}
            />
          ))}
          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>Music performance here!</h2>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    );
  })
);

export default Map;

function Search({setPanTo}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 27.522628, lng: () => -99.489061 },
      radius: 200 * 1000,
    },
  });

  return (
    <Combobox
      onSelect={(address) => {
        getGeocode({ address })
          .then((geocode) => {
            return getLatLng(geocode[0]);
          })
          .then((LatLng) => {
            const { lat, lng } = LatLng;
            setPanTo({lat, lng});
          })
          .catch((error) => console.log(error));
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Enter an address"
      />
      <ComboboxPopover>
        {status === "OK" &&
          data.map(({ id, description }) => (
            <ComboboxOption key={id} value={description} />
          ))}
      </ComboboxPopover>
    </Combobox>
  );
}

//event OnClick gives you the longitude latitude
