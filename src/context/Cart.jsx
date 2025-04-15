// frontend/src/context/cart.jsx
import { message } from 'antd';
import { createContext, useState, useEffect, useContext } from 'react';
import { getCart, addToCart as addToCartApi } from '../API/cart';
import { useAuth } from "../context/Auth";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  let { user } = useAuth();
  // Initialize cartItems from localStorage if available
  let cartObj = JSON.parse(localStorage.getItem('cartItems'));
  console.log("User is null? ",!user);
  let finalCartItems = [];
  if(user){
      finalCartItems = 
        user._id === cartObj['userId']
          ? (cartObj? cartObj['cartItems']:[])
          : []
      ;
  }else{
     finalCartItems = cartObj? cartObj['cartItems']:[];
  }
  const [cartItems, setCartItems] = useState(finalCartItems);
  useEffect(() => {
    getCartItems()
  }, [])

  const getCartItems = () => {
    console.log("User data: ", user);
    if (user) {
      getCart(user._id).then((res) => {

        setCartItems(res);
      });
    }
  }
  const addToCart = (item, userId, setLoading) => {
    // if user is logged in, call cart api to update cart in backend and update local storage
    if(userId){
    addToCartApi(item.id, userId).then((res) => {
      addToCartLocal(item, userId);
      setLoading(false);
    });
  }else{
    // if user is not logged in, update local storage only
    addToCartLocal(item, userId);
    setLoading(false);
  }
  };
  const addToCartLocal = (item, userId) => {
      let existsInCart = cartItems.some(el => el.item.id === item.id);
      if(existsInCart){
        let temp = cartItems.slice();
        var foundIndex = temp.findIndex(x => x.item.id == item.id);
        temp[foundIndex]= {...temp[foundIndex], quantity: temp[foundIndex].quantity + 1};
        setCartItems([...temp]);
      }else{
        setCartItems([...cartItems, { item: item, quantity: 1 }]);
      }
      message.success(`${item.title} has been added to cart!`);
  };

  const removeFromCart = (item) => {
    const isItemInCart = cartItems.find(cartItem => cartItem.id === item.id);
    if (isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => setCartItems({});

  const getCartTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify({"userId": user ? user._id: "","cartItems": cartItems}));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, getCartItems, removeFromCart, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
// {"userId":"67bd3aecccc962339f83dbc8","cartItems":[{"item":{"id":"67bd4b375a36fa123bf93f11","title":"Man Short Sleeve Shirt","description":"The Man Short Sleeve Shirt is a breezy and stylish option for warm days. With a comfortable fit and short sleeves, it's perfect for a laid-back yet polished look.","categoryId":"mens-shirts","price":19.99,"discountPercentage":8.65,"rating":4.62,"stock":20,"tags":["clothing","men's shirts"],"brand":"Casual Comfort","sku":"KEVGVDTV","weight":2,"dimensions":{"width":7.11,"height":28.63,"depth":27.54},"warrantyInformation":"5 year warranty","shippingInformation":"Ships in 2 weeks","availabilityStatus":"In Stock","reviews":[{"rating":5,"comment":"Great value for money!","date":"2024-05-23T08:56:21.623Z","reviewerName":"Caleb Nelson","reviewerEmail":"caleb.nelson@x.dummyjson.com"},{"rating":1,"comment":"Disappointing product!","date":"2024-05-23T08:56:21.623Z","reviewerName":"Emily Johnson","reviewerEmail":"emily.johnson@x.dummyjson.com"},{"rating":4,"comment":"Great product!","date":"2024-05-23T08:56:21.623Z","reviewerName":"Mila Hernandez","reviewerEmail":"mila.hernandez@x.dummyjson.com"}],"returnPolicy":"7 days return policy","minimumOrderQuantity":1,"meta":{"createdAt":"2024-05-23T08:56:21.623Z","updatedAt":"2024-05-23T08:56:21.623Z","barcode":"8162805546713","qrCode":"https://assets.dummyjson.com/public/qr-code.png"},"images":["https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Short%20Sleeve%20Shirt/1.png","https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Short%20Sleeve%20Shirt/2.png","https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Short%20Sleeve%20Shirt/3.png","https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Short%20Sleeve%20Shirt/4.png"],"thumbnail":"https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Short%20Sleeve%20Shirt/thumbnail.png"},"quantity":2},{"item":{"id":"67bd4b375a36fa123bf93f15","title":"Man Plaid Shirt","description":"The Man Plaid Shirt is a timeless and versatile men's shirt with a classic plaid pattern. Its comfortable fit and casual style make it a wardrobe essential for various occasions.","categoryId":"mens-shirts","price":34.99,"discountPercentage":17.53,"rating":3.66,"stock":65,"tags":["clothing","men's shirts"],"brand":"Classic Wear","sku":"TWL7HRBB","weight":1,"dimensions":{"width":29.56,"height":29.84,"depth":7.77},"warrantyInformation":"Lifetime warranty","shippingInformation":"Ships in 1 week","availabilityStatus":"In Stock","reviews":[{"rating":3,"comment":"Would not buy again!","date":"2024-05-23T08:56:21.623Z","reviewerName":"Nora Mills","reviewerEmail":"nora.mills@x.dummyjson.com"},{"rating":1,"comment":"Very disappointed!","date":"2024-05-23T08:56:21.623Z","reviewerName":"Addison Ward","reviewerEmail":"addison.ward@x.dummyjson.com"},{"rating":4,"comment":"Awesome product!","date":"2024-05-23T08:56:21.623Z","reviewerName":"Emily Brown","reviewerEmail":"emily.brown@x.dummyjson.com"}],"returnPolicy":"30 days return policy","minimumOrderQuantity":1,"meta":{"createdAt":"2024-05-23T08:56:21.623Z","updatedAt":"2024-05-23T08:56:21.623Z","barcode":"9383795178668","qrCode":"https://assets.dummyjson.com/public/qr-code.png"},"images":["https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Plaid%20Shirt/1.png","https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Plaid%20Shirt/2.png","https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Plaid%20Shirt/3.png","https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Plaid%20Shirt/4.png"],"thumbnail":"https://cdn.dummyjson.com/products/images/mens-shirts/Man%20Plaid%20Shirt/thumbnail.png"},"quantity":1}]}