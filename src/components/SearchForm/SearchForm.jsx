import React, { useState } from "react";
import LocationInput from "../LocationInput/LocationInput";
import "./SearchForm.scss";
import MaxDistanceSelect from "../MaxDistanceSelect/MaxDistanceSelect";
import PriceRangeSelect from "../PriceRangeSelect/PriceRangeSelect";
import PeoplesInput from "../PeoplesInput/PeoplesInput";
import inputValidation from "../../service/inputValidation";

export default function SearchForm({ setYelpRequestData, setSearchIsEnable }) {
  const [coordinate, setCoordinate] = useState({ lon: null, lat: null });
  const [maxDistance, setMaxDistance] = useState(0);
  const [priceRange, setPriceRange] = useState(1);
  const [people, setPeople] = useState([]);
  const [errorMessage, setErrorMessage] = useState({
    location: "",
    people: "",
  });

  const categories = [].concat(
    ...people.map((value) => value?.categories.map((v) => v.alias))
  );

  const handleFormSubmit = () => {
    setErrorMessage({
      ...errorMessage,
      ...inputValidation(coordinate),
      people: people.length === 0 ? "Select people to go eat with" : "",
    });
    if (
      errorMessage.location === "" &&
      errorMessage.people === "" &&
      categories.length !== 0
    ) {
      setYelpRequestData({
        categories,
        priceRange,
        maxDistance,
        lon: coordinate.lon,
        lat: coordinate.lat,
      });
      setSearchIsEnable(false);
    }
  };

  return (
    <div className="search-form">
      <div className="inputs">
        <div className="margin-bottom-40">
          <LocationInput
            setCoordinate={setCoordinate}
            errorMessage={errorMessage}
            setErrormessage={setErrorMessage}
          />
        </div>
        <div className="margin-bottom-40">
          <MaxDistanceSelect setMaxDistance={setMaxDistance} />
        </div>
        <div className="margin-bottom-40">
          <PriceRangeSelect
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </div>
        <div className="margin-bottom-40">
          <PeoplesInput
            people={people}
            setPeople={setPeople}
            errorMessage={errorMessage.people}
          />
        </div>
        <div className="search-btn">
          <button
            type="button"
            onClick={() => {
              handleFormSubmit();
            }}
          >
            <i className="fas fa-search" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
