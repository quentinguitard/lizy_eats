import React, { useEffect, useState } from "react";
import axios from "axios";
import AutocompleteResult from "../AutocompleteResult/AutocompleteResult";
import "./LocationInput.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function LocationInput({
  setCoordinate,
  errorMessage,
  setErrormessage,
}) {
  const [locationSuggested, setLocationSuggested] = useState([]);
  const [locationInputValue, setLocationInputValue] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [resultsActive, setResultsActive] = useState(false);

  useEffect(() => {
    const getLocationSuggested = async () => {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationInputValue}.json?limit=4&types=place&autocomplete=true&access_token=${process.env.REACT_APP_MAP_BOX_API_KEY}`
      );

      setLocationSuggested(response.data.features);
      setResultsActive(true);
    };

    if (locationInputValue.length > 1) {
      getLocationSuggested();
    } else {
      setLocationSuggested([]);
      setResultsActive(false);
    }
  }, [locationInputValue]);

  const inputChangeHandle = (e) => {
    setLocationInputValue(e.target.value);
    setSelectedLocation("");
    setErrormessage({ ...errorMessage, location: "" });
  };

  const displayLocationSuggestedResults = locationSuggested.map((value) => (
    <AutocompleteResult
      key={value.id}
      text={value.place_name}
      onClickAction={() => {
        setCoordinate({ lon: value.center[0], lat: value.center[1] });
        setResultsActive(false);
        setSelectedLocation(value.place_name);
      }}
    />
  ));

  return (
    <div className="location-input">
      <div className="input-container">
        <p className="label">Choose a location</p>
        <div
          className={`input-layout ${resultsActive ? "active" : "inactive"} ${
            errorMessage.location !== "" ? "error" : ""
          }`}
        >
          <input
            type="text"
            onChange={(e) => inputChangeHandle(e)}
            value={selectedLocation || locationInputValue}
            placeholder="Where ?"
          />
        </div>
        {errorMessage.location !== "" && (
          <ErrorMessage text={errorMessage.location} />
        )}
      </div>
      {displayLocationSuggestedResults.length > 0 && resultsActive && (
        <ul className="results-container">{displayLocationSuggestedResults}</ul>
      )}
    </div>
  );
}
