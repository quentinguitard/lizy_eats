import React, { useEffect, useState } from "react";
import fetchRestaurants from "./RestaurantResultsService";
import "./RestaurantResults.scss";
import RestaurantCard from "../RestaurantCard/RestaurantCard";

export default function RestaurantResults({
  yelpRequestData,
  setSearchIsEnable,
}) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const lol = await fetchRestaurants(yelpRequestData);
      setRestaurants(lol);
    };

    fetchData();
  }, [yelpRequestData]);

  const restaurantCards = restaurants?.businesses?.map((value) => (
    <RestaurantCard key={value.id} restaurantData={value} />
  ));

  return (
    <div className="restaurants-results">
      <div className="restaurants-results-container">{restaurantCards}</div>
      <div className="search-btn">
        <button
          type="button"
          onClick={() => {
            setSearchIsEnable(true);
          }}
        >
          <i className="fas fa-search" />
          Back to Search
        </button>
      </div>
    </div>
  );
}
