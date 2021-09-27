import React from "react";
import "./RestaurantCard.scss";

export default function RestaurantCard({ restaurantData }) {
  const restaurantCategories = restaurantData?.categories.map((value) => (
    <div key={value.alias} className="categories-pellet">
      {value.title}
    </div>
  ));

  return (
    <a
      className="restaurant-card"
      href={restaurantData.url}
      target="_blank"
      rel="noreferrer"
    >
      <div
        style={{ background: `url(${restaurantData.image_url})` }}
        className="image"
      />
      <div className="restaurant-data">
        <h1 className="title">{restaurantData.name}</h1>
        <p className="phone">{restaurantData.display_phone}</p>
        <p>{restaurantData.location.display_address.toString()}</p>
        <div className="categories">{restaurantCategories}</div>
      </div>
    </a>
  );
}
