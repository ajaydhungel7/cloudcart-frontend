const PRODUCTS_API_URL = process.env.REACT_APP_BACKEND_URL + "/product";

export const getAllProducts = () => {
  return fetch(PRODUCTS_API_URL + "/list").then((res) => res.json()).catch(err => console.log(err));
};

export const getProductsByCategory = (category) => {
  return fetch(`${PRODUCTS_API_URL}/category/${category}`).then(
    (res) => res.json()
  ).catch(err => console.log(err));
};
