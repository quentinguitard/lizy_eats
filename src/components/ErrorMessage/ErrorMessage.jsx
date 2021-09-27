import React from "react";
import "./ErrorMessage.scss";

export default function ErrorMessage({ text }) {
  return <p className="error-message">{text}</p>;
}
