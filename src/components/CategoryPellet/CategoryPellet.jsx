import React from "react";
import "./CategoryPellet.scss";

export default function CategoryPellet({ text, removeAction }) {
  return (
    <div className="category-pellet">
      <p>{text}</p>
      <i
        role="presentation"
        onClick={() => removeAction()}
        className="fas fa-times"
      />
    </div>
  );
}
