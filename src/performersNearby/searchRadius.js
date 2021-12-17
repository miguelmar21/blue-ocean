import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SearchRadius(props) {
  const [miles, setMiles] = useState("");

  const handleChange = (event) => {
    setMiles(event.target.value);
    props.setSearchRadius(event.target.value);
  };

  return (
    <div className="PN searchRadius">
      <Box sx={{ minWidth: 120, textAlign: 'center' }}>
        <FormControl sx={{ m: 1, minWidth: 80 }} size={"small"}>
          <InputLabel id="demo-simple-select-label">miles</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={miles}
            label="miles"
            onChange={handleChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default SearchRadius;
