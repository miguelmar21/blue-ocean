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
import "@reach/combobox/styles.css";
import mapStyle from "./mapStyle";
import MarkerForm from "./MarkerForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TagViewModal from './tagViewModal.jsx';

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

const defaultCenter = { lat: 27.522628, lng: -99.489061 };

const Map = withScriptjs(
  withGoogleMap(() => {
    const [markers, setMarkers] = useState([]);
    const [filteredMarkers, setFilteredMarkers] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [canSetMarker, setCanSetMarker] = useState(true);
    const [selected, setSelected] = useState(null);
    const [panTo, setPanTo] = useState(null);
    const [formDisplayed, setFormDisplayed] = useState("none");

    let displayedMarkers = filteredMarkers.length > 0 ? filteredMarkers : markers

    const onMapClick = React.useCallback((event) => {
      setMarkers((currentMarkers) => [
        ...currentMarkers,
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: "",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Red_dot.svg/2048px-Red_dot.svg.png",
          otherPerformers: null,
        },
      ]);
      setCanSetMarker(false);
      setFormDisplayed("marker-form");
    }, []);

    function deletePerfomance(marker) {
      console.log("Looking for marker...");
      for (var i = 0; i < markers.length; i++) {
        if (markers[i].lng === marker.lng) {
          console.log("found!");
          markers.splice(i, 1);
          setMarkers([...markers]);
          setSelected(null);
          return;
        }
      }
    }

    function filterByTime() {
      function isBetweenDates(markers) {
        let date = new Date(markers.time);
        if (date.getTime() <= endDate.getTime() && date.getTime() >= startDate.getTime()) {
          return true;
        } else {
          return false;
        }
      }

      let filteredMarkers = markers.filter(isBetweenDates);
      setFilteredMarkers([...filteredMarkers])
    }

    function deleteFilter() {
      setFilteredMarkers([]);
    }

    return (
      <div>
        <Search setPanTo={setPanTo} />
        <Locate setPanTo={setPanTo} />
        <GoogleMap
          defaultZoom={8}
          defaultCenter={defaultCenter}
          options={options}
          onClick={canSetMarker && onMapClick}
          ref={(map) => map && panTo !== null && map.panTo(panTo)}
        >
          {displayedMarkers.map((marker) => (
            <Marker
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: marker.icon,
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              onClick={() => setSelected(marker)}
            />
          ))}
          {selected ? (

              <TagViewModal />


          ) : null}
        </GoogleMap>
        <MarkerForm
          formDisplayed={formDisplayed}
          setFormDisplayed={setFormDisplayed}
          setCanSetMarker={setCanSetMarker}
          markers={markers}
          setMarkers={setMarkers}
        />
        <div>Filter here</div>
        <DatePicker
          selected={startDate}
          onChange={(date) => {setStartDate(date); setEndDate(date)}}
          showTimeSelect
          dateFormat="Pp"
          minDate={new Date()}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          showTimeSelect
          dateFormat="Pp"
          minDate={startDate}
        />
        <button onClick={filterByTime}>Filter</button>
        <button onClick={deleteFilter}>Delete filter</button>
      </div>
    );
  })
);

export default Map;

function Locate({ setPanTo }) {
  return (
    <button
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPanTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      Click here to relocate to your position!
    </button>
  );
}

function Search({ setPanTo }) {
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
        setValue(address, false);
        clearSuggestions();

        getGeocode({ address })
          .then((geocode) => {
            return getLatLng(geocode[0]);
          })
          .then((LatLng) => {
            const { lat, lng } = LatLng;
            setPanTo({ lat, lng });
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
        <ComboboxList>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}
