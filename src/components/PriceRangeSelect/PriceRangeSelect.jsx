import React from "react";
import "./PriceRangeSelect.scss";
import PricePellet from "../PricePellet/PricePellet";

export default function PriceRangeSelect({ priceRange, setPriceRange }) {
  const priceList = [
    { title: "$", value: 1 },
    { title: "$$", value: 2 },
    { title: "$$$", value: 3 },
    { title: "$$$$", value: 4 },
  ];

  const priceListDisplay = priceList.map((value) => {
    return (
      <PricePellet
        key={value.value}
        text={value.title}
        isSelected={priceRange === value.value}
        onClickAction={() => setPriceRange(value.value)}
      />
    );
  });

  return (
    <div className="price-range-select">
      <p>How much you want to spend ?</p>
      <div className="price-list-container">{priceListDisplay}</div>
    </div>
  );
}
