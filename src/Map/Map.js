import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { deletePerformance } from "./mapHelpers";
import TagViewModal from "./tagViewModal.jsx";

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

const defaultCenter = { lat: 30.267153, lng: -97.743057 };

const Map = withScriptjs(
  withGoogleMap(({ setCurrentLocation, loggedInUser }) => {
    const [markers, setMarkers] = useState([]);
    const [filteredMarkers, setFilteredMarkers] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [canSetMarker, setCanSetMarker] = useState(true);
    const [selected, setSelected] = useState(null);
    const [panTo, setPanTo] = useState(null);
    const [formDisplayed, setFormDisplayed] = useState("none");

    useEffect(() => {
      if (loggedInUser.is_performer === false) {
        setCanSetMarker(false)
      } else {
        setCanSetMarker(true)
      }
    }, [loggedInUser])

    function getPerformancesFromDB(){
      axios
      .get("http://localhost:3000/updatePerformances")
      .then((response) => {
        let performances = [];
        for (const setOfPerformances of response.data) {
          for (const performance of setOfPerformances.performances) {
            performance.username = setOfPerformances.username;
            performance.name = setOfPerformances.name;
            performance.user_picture = setOfPerformances.user_picture;
            performances.push(performance);
          }
        }
        console.log(performances);
        setMarkers(performances);
      })
      .catch((error) => {
        console.log(error);
      });
    }

    useEffect(() => {
      getPerformancesFromDB()
    }, []);

    useEffect(() => {
      if (panTo !== null) setCurrentLocation(panTo);
    }, [panTo]);

    let displayedMarkers = filteredMarkers !== null ? filteredMarkers : markers;

    const onMapClick = React.useCallback((event) => {
      setMarkers((currentMarkers) => [
        ...currentMarkers,
        {
          location: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          },
          time: "",
          category:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Red_dot.svg/2048px-Red_dot.svg.png",
          otherPerformers: null,
        },
      ]);
      setCanSetMarker(false);
      setFormDisplayed("marker-form");
    }, []);

    function deletePerfomanceFrontEnd(marker) {
      for (var i = 0; i < markers.length; i++) {
        if (markers[i].location.lng === marker.location.lng) {
          markers.splice(i, 1);
          setMarkers([...markers]);
          setSelected(null);
        }
      }
      deletePerformance({
        username: marker.username,
        lat: marker.location.lat,
        lng: marker.location.lng,
      });
    }

    function filterByTime() {
      function isBetweenDates(markers) {
        let date = new Date(markers.time);
        console.log(startDate.getTime(), date.getTime(), endDate.getTime());
        if (
          date.getTime() <= endDate.getTime() &&
          date.getTime() >= startDate.getTime()
        ) {
          return true;
        } else {
          console.log("false!");
          return false;
        }
      }

      let filteredMarkers = markers.filter(isBetweenDates);
      setFilteredMarkers([...filteredMarkers]);
    }

    function deleteFilter() {
      setFilteredMarkers(null);
    }

    return (
      <div className="google-maps">
        <Search setPanTo={setPanTo} />
        <Locate setPanTo={setPanTo} />
        <GoogleMap
          defaultZoom={8}
          defaultCenter={defaultCenter}
          // options={options}
          onClick={canSetMarker && onMapClick}
          ref={(map) => map && panTo !== null && map.panTo(panTo)}
        >
          {displayedMarkers.map((marker) => (
            <Marker
              position={{ lat: marker.location.lat, lng: marker.location.lng }}
              icon={{
                url: marker.category,
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              onClick={() => setSelected(marker)}
            />
          ))}
          {selected ? (
            <InfoWindow
              position={{
                lat: selected.location.lat,
                lng: selected.location.lng,
              }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <TagViewModal
                selected={selected}
                setSelected={setSelected}
                deletePerfomanceFrontEnd={deletePerfomanceFrontEnd}
                loggedInUser={loggedInUser}
              />
            </InfoWindow>
          ) : null}
        </GoogleMap>
        <MarkerForm
          formDisplayed={formDisplayed}
          setFormDisplayed={setFormDisplayed}
          setCanSetMarker={setCanSetMarker}
          markers={markers}
          setMarkers={setMarkers}
          loggedInUser={loggedInUser}
          getPerformancesFromDB={getPerformancesFromDB}
        />
        <button
          className="time-filter"
          onClick={() => setFormDisplayed("filter")}
          disabled={formDisplayed === "marker-form" ? true : false}
        >
          Filter by dates
        </button>
        {formDisplayed === "filter" && (
          <div className="time-filter-form">
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setEndDate(date);
              }}
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
            <button
              onClick={() => {
                filterByTime();
                setFormDisplayed("none");
              }}
            >
              Search
            </button>
            <button
              onClick={() => {
                deleteFilter();
                setFormDisplayed("none");
              }}
            >
              Reset
            </button>
          </div>
        )}
      </div>
    );
  })
);

export default Map;

function Locate({ setPanTo }) {
  return (
    <button
      className="relocate"
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
      🧭
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
      location: { lat: () => 30.267153, lng: () => -97.743057 },
      radius: 200 * 1000,
    },
  });

  return (
    <div className="search">
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
    </div>
  );
}
