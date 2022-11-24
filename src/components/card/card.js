import React, { useState } from "react";
import "./card.css";
import { Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";

import pickUpBadgeBlank from "./../../assets/pickUpBadgeBlank.svg";
import dropOffBadgeBlank from "./../../assets/dropOffBadgeBlank.svg";
import pickUpBadgeError from "./../../assets/pickUpBadgeError.svg";
import dropOffBadgeError from "./../../assets/dropOffBadgeError.svg";
import pickUpBadgePresent from "./../../assets/pickUpBadgePresent.svg";
import dropOffBadgePresent from "./../../assets/dropOffBadgePresent.svg";
import pickUpMarker from "./../../assets/pickUpMarker.svg";
import dropOffMarker from "./../../assets/dropOffMarker.svg";

function Card() {
  Geocode.setApiKey("AIzaSyD_wZVx1K4lgUA7wlSDe-xlzzjQQADEdLY");

  const [pickUpInputValue, setPickUpInputValue] = useState("");
  const [dropOffInputValue, setDropOffInputValue] = useState("");

  const [pickUpBadge, setPickUpBadge] = useState(pickUpBadgeBlank);
  const [dropOffBadge, setDropOffBadge] = useState(dropOffBadgeBlank);

  const [pickUpValidity, setPickUpValidity] = useState(false);
  const [dropOffValidity, setDropOffValidity] = useState(false);

  const [pickUpLatLon, setPickUpLatLon] = useState([0, 0]);
  const [dropOffLatLon, setDropOffLatLon] = useState([0, 0]);

  function handlePickUpInputChange(e) {
    setPickUpInputValue(e.currentTarget.value);
  }

  function handleDropOffInputChange(e) {
    setDropOffInputValue(e.currentTarget.value);
  }

  function validatePickUpInput() {
    if (pickUpInputValue === "29 Rue du 4 Septembre" || pickUpInputValue === "15 Rue de Bourgogne") {
      setPickUpValidity(true);
      setPickUpBadge(pickUpBadgePresent);

      Geocode.fromAddress(pickUpInputValue).then(
        (response) => {
          setPickUpLatLon(response.results[0].geometry.location);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      setPickUpBadge(dropOffBadgeError);
      setPickUpValidity(false);
    }
  }

  function validateDropOffInput() {
    if (dropOffInputValue === "29 Rue du 4 Septembre" || dropOffInputValue === "15 Rue de Bourgogne") {
      setDropOffBadge(dropOffBadgePresent);
      setDropOffValidity(true);

      Geocode.fromAddress(dropOffInputValue).then(
        (response) => {
          setDropOffLatLon(response.results[0].geometry.location);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      setDropOffBadge(pickUpBadgeError);
      setDropOffValidity(false);
    }
  }

  function handleOnClick() {
    const toast = document.getElementById("toast");
    toast.classList.add("visible");
    setTimeout(function () {
      toast.classList.remove("visible");
    }, 1500);

    const inputs = document.getElementsByClassName("card-input");

    Array.from(inputs).forEach((inputElement) => {
      inputElement.value = "";
    });

    setPickUpInputValue("");
    setDropOffInputValue("");

    setPickUpBadge(pickUpBadgeBlank);
    setDropOffBadge(dropOffBadgeBlank);

    setPickUpValidity(false);
    setDropOffValidity(false);
  }

  return (
    <>
      <div className="card">
        <div className="input-with-logo">
          <img src={pickUpBadge} className="card-logo" alt="pickUpBadgeBlank" />
          <input
            className="card-input"
            placeholder="Pick up address"
            onBlur={validatePickUpInput}
            onChange={handlePickUpInputChange}
          ></input>
        </div>
        <div className="input-with-logo">
          <img src={dropOffBadge} className="card-logo" alt="dropOffBadgeBlank" />
          <input
            className="card-input"
            placeholder="Drop off address"
            onBlur={validateDropOffInput}
            onChange={handleDropOffInputChange}
          ></input>
        </div>
        <button
          className={pickUpValidity && dropOffValidity ? "card-btn" : "card-btn disable"}
          disabled={!pickUpValidity || !dropOffValidity}
          onClick={handleOnClick}
        >
          Create job
        </button>
      </div>
      {pickUpValidity ? <Marker icon={pickUpMarker} position={pickUpLatLon}></Marker> : <></>}
      {dropOffValidity ? <Marker icon={dropOffMarker} position={dropOffLatLon}></Marker> : <></>}
      <div className="toast" id="toast">
        <div className="toast-body">Job has been created successfully</div>
      </div>
    </>
  );
}

export default Card;
