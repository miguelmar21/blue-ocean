import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import API_KEY from "../../config";
import Geocode from "react-geocode";

Geocode.setApiKey(API_KEY);

export default function TagViewModal({
  selected,
  setSelected,
  loggedInUser,
  deletePerfomanceFrontEnd,
}) {
  const [address, setAddress] = useState(null);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #ff0",
    boxShadow: 12,
    p: 4,
    borderRadius: 15,
  };

  var handleProfileClick = function() {
    console.log('see profile clicked')
  }

  useEffect(() => {
    if (selected !== null) {
      let lat = selected.location.lat;
      let lng = selected.location.lng;
      Geocode.fromLatLng(lat.toString(), lng.toString())
        .then((response) => {
          let newAddress = response.results[0].formatted_address;
          setAddress(newAddress);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selected]);

  useEffect(() => {
    handleOpen();
  }, []);

  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component={"span"}
          >
            <table align="center">
              <tbody>
                <tr>
                  <td bgcolor="999933">
                    <img
                      className="tag-modal-img"
                      src={selected.user_picture}
                    ></img>
                  </td>
                  <td bgcolor="ffd700">
                    <table className="name-and-category">
                      <tbody>
                        <tr>
                          <td>{selected.name}</td>
                        </tr>
                        <hr></hr>
                        <tr>
                          <td align="center">
                            {selected.category ===
                            "https://svg-clipart.com/svg/color/oLsCLwr-blue-musical-note-vector.svg"
                              ? "Music show"
                              : selected.category ===
                                "https://upload.wikimedia.org/wikipedia/commons/e/e7/004-rolling-on-the-floor-laughing-1.svg"
                              ? "Comedy show"
                              : selected.category ===
                                "https://upload.wikimedia.org/wikipedia/commons/9/97/Emoji_u1f483.svg"
                              ? "Dance show"
                              : "Miscellaneous"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" align="center">
                    {selected.time}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" align="center">
                    {address}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" align="center">
                    <button onClick={handleProfileClick}>See Profile</button>
                  </td>
                </tr>
                {loggedInUser.username === selected.username && (
                  <tr>
                    <td colSpan="2" align="center">
                      <button onClick={() => deletePerfomanceFrontEnd(selected)}>Delete performance</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
