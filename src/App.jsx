import React, { useState } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm/SearchForm";
import RestaurantResults from "./components/RestaurantResults/RestaurantResults";
import Header from "./components/Header/Header";

function App() {
  const [searchIsEnable, setSearchIsEnable] = useState(true);
  const [yelpRequestData, setYelpRequestData] = useState({
    lon: null,
    lat: null,
    categories: [],
    maxDistance: 1,
    priceRange: 0,
  });

  return (
    <div className="App">
      <Header />
      {searchIsEnable && (
        <SearchForm
          setYelpRequestData={setYelpRequestData}
          setSearchIsEnable={setSearchIsEnable}
        />
      )}
      {!searchIsEnable && (
        <RestaurantResults
          yelpRequestData={yelpRequestData}
          setSearchIsEnable={setSearchIsEnable}
        />
      )}
    </div>
  );
}

export default App;
