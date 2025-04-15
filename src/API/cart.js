const CART_API_URL = process.env.REACT_APP_BACKEND_URL + "/cart";

export const getCart = (userId) => {
    return fetch(CART_API_URL + "/cart/"+userId).then((res) => res.json()).catch((e)=>{
    console.log(e);});
  };
  
export const addToCart = (productId,userId) => {
  return fetch(CART_API_URL + '/cart', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      product_id: productId,
      quantity: 1
    }),
  }).then((res) => res.json());
};
    