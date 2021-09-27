const locationVerify = (input) => {
  const errors = {};
  switch (true) {
    case !input.lon && !input.lat:
      errors.location = "Please select a location";
      break;
    default:
      errors.location = "";
  }
  switch (true) {
    case input.name || input.name === "":
      errors.name = "Please enter a name";
      break;
    default:
      errors.name = "";
  }
  switch (true) {
    case input.categories && input.categories.length === 0:
      errors.categories = "Please select a cuisine type";
      break;
    default:
      errors.categories = "";
  }
  return errors;
};

export default locationVerify;
