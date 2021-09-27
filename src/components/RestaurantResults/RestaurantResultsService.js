import axios from "axios";

const getTopCategories = (object) => {
  return Object.keys(object).filter((x) => {
    return object[x] === Math.max.apply(null, Object.values(object));
  });
};

const fetchRestaurants = async (yelpRequestData) => {
  const sortCategories = yelpRequestData.categories.reduce((prev, cur) => {
    prev[cur] = (prev[cur] || 0) + 1;
    return prev;
  }, {});

  const response = await axios.get(
    `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=${getTopCategories(
      sortCategories
    ).toString()}&radius=${yelpRequestData.maxDistance}&longitude=${
      yelpRequestData.lon
    }&latitude=${yelpRequestData.lat}&price=${
      yelpRequestData.priceRange
    }&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
        withCredentials: true,
      },
    }
  );

  return response.data;
};

export default fetchRestaurants;
