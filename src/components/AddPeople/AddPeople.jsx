import React, { useState, useEffect } from "react";
import "./AddPeople.scss";
import axios from "axios";
import AutocompleteResult from "../AutocompleteResult/AutocompleteResult";
import CategoryPellet from "../CategoryPellet/CategoryPellet";
import inputValidation from "../../service/inputValidation";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function AddPeople({ setAddPeople, setPeople, people }) {
  const [peopleData, setPeopleData] = useState({ name: "", categories: [] });
  const [categories, setCategories] = useState([]);
  const [categoriesInput, setCategoriesInput] = useState("");
  const [displayResults, setDisplayResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    categories: "",
  });

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get("/v3/categories", {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
          withCredentials: true,
        },
      });

      const sortRestaurantCategories = response.data.categories.filter(
        (value) => value.parent_aliases.includes("restaurants")
      );
      setCategories(sortRestaurantCategories);
    };
    getCategories();
  }, []);

  const displayCategories = categories
    .filter(({ title }) => {
      const regex = new RegExp(`${categoriesInput}`, "gi");
      return title.match(regex);
    })
    .map((value) => (
      <AutocompleteResult
        key={value.alias}
        text={value.title}
        onClickAction={() => {
          setErrorMessage({ ...errorMessage, categories: "" });
          setPeopleData({
            ...peopleData,
            categories: [
              ...peopleData.categories.filter((v) => v.title !== value.title),
              value,
            ],
          });
          setDisplayResults(false);
        }}
      />
    ));

  const displayCategoriesSelected = peopleData.categories.map((value) => (
    <CategoryPellet
      key={value.alias}
      text={value.title}
      removeAction={() =>
        setPeopleData({
          ...peopleData,
          categories: peopleData.categories.filter(
            (v) => v.title !== value.title
          ),
        })
      }
    />
  ));

  return (
    <div className="add-people">
      <div className="input-container">
        <div
          className={
            errorMessage.name === ""
              ? "input-layout inactive"
              : "input-layout inactive error"
          }
        >
          <input
            type="text"
            onChange={(e) => {
              setPeopleData({ ...peopleData, name: e.target.value });
              setErrorMessage({ ...errorMessage, name: "" });
            }}
            value={peopleData.name}
            placeholder="Name ?"
          />
        </div>
        {errorMessage.name !== "" && <ErrorMessage text={errorMessage.name} />}
      </div>
      <div className="input-container">
        <p>Cuisine Type</p>
        <div
          className={
            errorMessage.categories === ""
              ? "input-layout inactive"
              : "input-layout inactive error"
          }
        >
          <input
            type="text"
            onFocus={() => setDisplayResults(true)}
            onChange={(e) => {
              setCategoriesInput(e.target.value);
              setErrorMessage({ ...errorMessage, categories: "" });
            }}
            value={categoriesInput}
            placeholder="Cuisine ?"
          />
        </div>
        {errorMessage.categories !== "" && (
          <ErrorMessage text={errorMessage.categories} />
        )}

        {displayResults && (
          <ul className="results-container">{displayCategories}</ul>
        )}

        <div className="categories-selected">{displayCategoriesSelected}</div>

        <div className="add-btn">
          <button
            type="button"
            onClick={() => {
              const errors = inputValidation(peopleData);
              setErrorMessage(errors);
              if (!errors.name && !errors.categories) {
                setPeople([...people, peopleData]);
                setAddPeople(false);
              }
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
