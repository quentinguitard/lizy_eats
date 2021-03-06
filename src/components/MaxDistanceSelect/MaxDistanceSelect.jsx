import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./MaxDistanceSelect.scss";

export default function MaxDistanceSelect({ maxDistance, setMaxDistance }) {
  return (
    <div className="max-distance-select">
      <p>How far can you go ?</p>
      <Slider min={1} max={40000} onChange={(value) => setMaxDistance(value)} />
      <p className="distance-display">{maxDistance} meters</p>
    </div>
  );
}
