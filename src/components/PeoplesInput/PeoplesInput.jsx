import React, { useState } from "react";
import "./PeoplesInput.scss";
import AddPeople from "../AddPeople/AddPeople";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function PeoplesInput({ people, setPeople, errorMessage }) {
  const [addPeople, setAddPeople] = useState(false);

  const displayPeoples = people.map((value) => (
    <div key={value.name} className="people">
      <p>{value.name}</p>
      <i
        role="presentation"
        onClick={() => setPeople(people.filter((v) => v.name !== value.name))}
        className="fas fa-times"
      />
    </div>
  ));

  return (
    <div className="peoples-input">
      <p>Who are you going to eat with ?</p>
      {errorMessage !== "" && <ErrorMessage text={errorMessage} />}
      {!addPeople && (
        <div className="add-people-btn">
          <button type="button" onClick={() => setAddPeople(true)}>
            Add a person
          </button>
        </div>
      )}

      {addPeople && (
        <AddPeople
          people={people}
          setPeople={setPeople}
          setAddPeople={setAddPeople}
        />
      )}

      {displayPeoples}
    </div>
  );
}
