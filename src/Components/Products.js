import {
    Badge,
    Button,
    Card,
    Image,
    List,
    message,
    Rate,
    Spin,
    Typography,
    Select,
    notification,
  } from "antd";
  import { useEffect, useState } from "react";
  import { getAllProducts, getProductsByCategory } from "../API/product";
  import { addToCart } from "../API/cart";
  import { useAuth } from "../context/Auth";
  import { useParams } from "react-router-dom";
  import {useCart} from "../context/Cart";
  
  function Products() {
    const [loading, setLoading] = useState(false);
    const param = useParams();
    const [items, setItems] = useState([]);
    const [sortOrder, setSortOrder] = useState("az");
    const {cartItems, addToCart} = useCart();
    useEffect(() => {
      setLoading(true);
      (param?.categoryId
        ? getProductsByCategory(param.categoryId)
        : getAllProducts()
      ).then((res) => {
        setItems(res.items);
        setLoading(false);
      }).catch(err => {
        setItems([]);
        setLoading(false);
        notification.error({
          message: "Fetching Error",
          description: "Failed to retrieve data",
        });
      });
    }, [param]);
  
    const getSortedItems = () => {
      const sortedItems = [...items];
      sortedItems.sort((a, b) => {
        const aLowerCaseTitle = a.title.toLowerCase();
        const bLowerCaseTitle = b.title.toLowerCase();
  
        if (sortOrder === "az") {
          return aLowerCaseTitle > bLowerCaseTitle
            ? 1
            : aLowerCaseTitle === bLowerCaseTitle
            ? 0
            : -1;
        } else if (sortOrder === "za") {
          return aLowerCaseTitle < bLowerCaseTitle
            ? 1
            : aLowerCaseTitle === bLowerCaseTitle
            ? 0
            : -1;
        } else if (sortOrder === "lowHigh") {
          return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
        } else if (sortOrder === "highLow") {
          return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
        }
      });
      return sortedItems;
    };
  
    return (
      <div className="productsContainer">
        <div className="main-layout">
          <Typography.Text>View Items Sorted By: </Typography.Text>
          <Select
            onChange={(value) => {
              setSortOrder(value);
            }}
            defaultValue={"az"}
            options={[
              {
                label: "Alphabetically a-z",
                value: "az",
              },
              {
                label: "Alphabetically z-a",
                value: "za",
              },
              {
                label: "Price Low to High",
                value: "lowHigh",
              },
              {
                label: "Price High to Low",
                value: "highLow",
              },
            ]}
          ></Select>
        </div>
        <List
          loading={loading}
          grid={{ column: 3 }}
          renderItem={(product, index) => {
            return (
              <Badge.Ribbon
                className="itemCardBadge"
                text={`${product.discountPercentage}% Off`}
                color="pink"
              >
                <Card
                  className="itemCard"
                  title={product.title}
                  key={index}
                  cover={
                    <Image className="itemCardImage" src={product.thumbnail} />
                  }
                  actions={[
                    <Rate allowHalf disabled value={product.rating} />,
                    <AddToCartButton item={product} />,
                  ]}
                >
                  <Card.Meta
                    title={
                      <Typography.Paragraph>
                        Price: ${product.price}{" "}
                        <Typography.Text delete type="danger">
                          $
                          {parseFloat(
                            product.price +
                              (product.price * product.discountPercentage) / 100
                          ).toFixed(2)}
                        </Typography.Text>
                      </Typography.Paragraph>
                    }
                    description={
                      <Typography.Paragraph
                        ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                      >
                        {product.description}
                      </Typography.Paragraph>
                    }
                  ></Card.Meta>
                </Card>
              </Badge.Ribbon>
            );
          }}
          dataSource={getSortedItems()}
        ></List>
      </div>
    );
  }
  
  function AddToCartButton({ item}) {
    const {user} = useAuth();
    const [loading, setLoading] = useState(false);
    const {cartItems, addToCart} = useCart();
    const addProductToCart = () => {
      setLoading(true);
      addToCart(item, user._id,setLoading);
    };
    
    // if(cartItems.length) {
    //   return (
    //     <Button
    //       type="link"
    //       onClick={() => {
    //         addProductToCart();
    //       }}
    //       loading={loading}
    //     >
    //       Update Cart
    //     </Button>
    //   );
    // }
    let existsInCart = cartItems.some(el => el.item.id === item.id);
    if(existsInCart){
      return (
        <div style={{ display: 'flex', gap: '0px', alignItems: 'center' }}>
          <Button
            type="link"
            onClick={() => {
              addProductToCart();
            }}
            loading={loading}
            style={{ fontSize: '24px', fontWeight: 'bold' }}
          >
            +
          </Button>
          <b style={{color: 'black'}}>{cartItems.filter(el => el.item.id === item.id)[0].quantity}</b>
          
      
          <Button
            type="link"
            onClick={() => {
              addProductToCart();
            }}
            style={{ fontSize: '24px', fontWeight: 'bold' }}
          >
            -
          </Button>
        </div>
      );
    }
    return (
      <Button
        type="link"
        onClick={() => {
          addProductToCart();
        }}
        loading={loading}
      >
        Add to Cart
      </Button>
    );
  }
  export default Products;
  