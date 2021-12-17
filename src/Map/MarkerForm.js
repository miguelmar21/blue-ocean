import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {addToPerformances} from './mapHelpers';

export default function MarkerForm({
  formDisplayed,
  setFormDisplayed,
  setCanSetMarker,
  markers,
  setMarkers,
  loggedInUser,
  getPerformancesFromDB
}) {
  const [categoryValue, setCategoryValue] = useState("music");
  const [otherPerformers, setOtherPerformers] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  function handleChange(e, field) {
    if (field === "category") setCategoryValue(e.target.value);
    if (field === "otherPerformers") setOtherPerformers(e.target.value);
  }

  function handleSubmit(e) {
    let lastMarker = markers[markers.length - 1];
    categoryValue === "music"
      ? (lastMarker.category =
          "https://svg-clipart.com/svg/color/oLsCLwr-blue-musical-note-vector.svg")
      : categoryValue === "comedy"
      ? (lastMarker.category =
          "https://upload.wikimedia.org/wikipedia/commons/e/e7/004-rolling-on-the-floor-laughing-1.svg")
      : categoryValue === "dance"
      ? (lastMarker.category =
          "https://upload.wikimedia.org/wikipedia/commons/9/97/Emoji_u1f483.svg")
      : (lastMarker.category =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Red_dot.svg/2048px-Red_dot.svg.png");
    lastMarker.time = startDate.toString();
    lastMarker.otherPerformers = otherPerformers;
    lastMarker.username = loggedInUser.username;
    lastMarker.name = loggedInUser.name;
    lastMarker.user_picture = loggedInUser.user_picture;
    let newMarkerArray = markers;
    newMarkerArray.pop();
    newMarkerArray.push(lastMarker);
    setMarkers([...newMarkerArray]);
    addToPerformances({
      username: loggedInUser.username,
      name: loggedInUser.name,
      user_picture: loggedInUser.user_picture,
      location: {
        lat: lastMarker.location.lat,
        lng: lastMarker.location.lng,
      },
      time: lastMarker.time,
      category: lastMarker.category,
      additionalPerformers: lastMarker.otherPerformers
    })
    setFormDisplayed("none");
    setCanSetMarker(true);
    // getPerformancesFromDB();
    e.preventDefault();
  }

  let className = "marker-form";
  if (formDisplayed === "marker-form") {
    className += " active";
  } else {
    className += " hidden";
  }
  return (
    <div>
      <form className={className} onSubmit={handleSubmit}>
        <label htmlFor="category">Select a category:</label><br></br>
        <select
          name="category"
          value={categoryValue}
          onChange={(e) => handleChange(e, "category")}
        >
          <option value="music">Music</option>
          <option value="comedy">Comedy</option>
          <option value="dance">Dance</option>
          <option value="misc">Miscellaneous</option>
        </select><br></br>

        <label htmlFor="time">Select a date and time</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          dateFormat="Pp"
          minDate={new Date()}
        /><br></br>

        {/* <label htmlFor="performers">
          What other performers are performing here?
        </label><br></br>
        <input
          type="text"
          id="performers"
          name="performers"
          onChange={(e) => handleChange(e, "otherPerformers")}
        ></input> */}

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
