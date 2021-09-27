import React from "react";
import "./Header.scss";
import logo from "../../assets/image/logo.svg";

export default function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo" />
      <h2>EATS</h2>
    </div>
  );
}
