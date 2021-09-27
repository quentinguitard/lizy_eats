import React from "react";
import "./AutocompleteResult.scss";

export default function AutocompleteResult({ text, onClickAction }) {
  return (
    <li
      role="presentation"
      onClick={() => onClickAction()}
      className="autocomplete-result"
    >
      {text}
    </li>
  );
}
