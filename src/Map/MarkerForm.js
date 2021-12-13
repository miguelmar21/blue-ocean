import React, { useState } from "react";

export default function MarkerForm({
  formDisplayed,
  setFormDisplayed,
  setCanSetMarker,
  markers,
  setMarkers
}) {
  const [categoryValue, setCategoryValue] = useState("music");
  const [time, setTime] = useState("");
  const [otherPerformers, setOtherPerformers] = useState("");

  function handleChange(e, field) {
    if (field === 'category') setCategoryValue(e.target.value);
    if (field === 'time') setTime(e.target.value); 
    if (field === 'otherPerformers') setOtherPerformers(e.target.value);
  }

  function handleSubmit(e) {
    let lastMarker = markers[markers.length - 1];
    let lastMarkerFix = 
        categoryValue === "music" ? lastMarker.icon = "https://svg-clipart.com/svg/color/oLsCLwr-blue-musical-note-vector.svg" :
        categoryValue === "comedy" ? lastMarker.icon = "https://upload.wikimedia.org/wikipedia/commons/e/e7/004-rolling-on-the-floor-laughing-1.svg":
        categoryValue === "dance" ? lastMarker.icon = "https://upload.wikimedia.org/wikipedia/commons/9/97/Emoji_u1f483.svg":
        lastMarker.icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Red_dot.svg/2048px-Red_dot.svg.png"
    lastMarker.time = time;
    lastMarker.otherPerformers = otherPerformers;
    let newMarkerArray = markers;
    newMarkerArray.pop();
    newMarkerArray.push(lastMarker);
    setMarkers([...newMarkerArray]);
    setFormDisplayed("none");
    setCanSetMarker(true);
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
        <label htmlFor="category">Select a category:</label>
        <select name="category" value={categoryValue} onChange={e=> handleChange(e, 'category')}>
          <option value="music">Music</option>
          <option value="comedy">Comedy</option>
          <option value="dance">Dance</option>
          <option value="misc">Miscellaneous</option>
        </select>

        <label htmlFor="time">What time?</label>
        <input type="text" id="time" name="time" onChange={e => handleChange(e, 'time')}></input>

        <label htmlFor="performers">
          What other performers are performing here?
        </label>
        <input type="text" id="performers" name="performers" onChange={e=> handleChange(e, 'otherPerformers')}></input>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
