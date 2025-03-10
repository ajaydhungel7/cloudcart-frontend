const API_URL = "k8s-appingressgroup-9b0a5c907e-1443798777.us-east-1.elb.amazonaws.com/products";

export const getAllProducts = () => {
  return fetch(API_URL + "/products").then((res) => res.json());
};
export const getProductsByCategory = (category) => {
  return fetch(`${API_URL}/products/category/${category}`).then(
    (res) => res.json()
  );
};
export const getCart = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const addToCart = (id) => {
  return fetch("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: id,
          quantity: 1,
        },
      ],
    }),
  }).then((res) => res.json());
};
  
