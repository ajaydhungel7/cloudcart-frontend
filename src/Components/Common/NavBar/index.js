import { HomeFilled, LoginOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  InputNumber,
  Menu,
  message,
  Table,
  Typography,
} from "antd";
import {
  LogoutOutlined,
} from "@ant-design/icons";
import { PageHeader } from "@ant-design/pro-layout";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/Auth";
import { getCart } from "../../../API/cart";
import { useLanguage } from "../../../context/Language";
import { useLocation } from "react-router-dom";
import { useCart } from "../../../context/Cart";

function handleLogout(logout) {
  try {
    logout();
  } catch (e) {
    console.log(e.message);
  }
}


function AppHeader() {
  const onMenuClick = (item) => {
    navigate(`/category/${item.key}`);
  };

  const { pathname: location } = useLocation();
  let { t } = useLanguage();
  let { user, logout } = useAuth();

  let navigate = useNavigate();
  if (location === "/") return null;

  return (
    <div className="appHeader">
      <Menu
        className="appMenu"
        onClick={onMenuClick}
        mode="horizontal"

        items={[
          {
            label: <HomeFilled style={{ fontSize: "20px" }} />,
            key: "",
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Men's Shirts",
                key: "mens-shirts",
              },
              {
                label: "Men's Shoes",
                key: "mens-shoes",
              },
              {
                label: "Men's Watches",
                key: "mens-watches",
              },
            ],
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Women's Dresses",
                key: "womens-dresses",
              },
              {
                label: "Women's Shoes",
                key: "womens-shoes",
              },
              {
                label: "Women's Watches",
                key: "womens-watches",
              },
              {
                label: "Women's Bags",
                key: "womens-bags",
              },
              {
                label: "Women's Jewellery",
                key: "womens-jewellery",
              },
            ],
          },
          {
            label: "Fragrances",
            key: "fragrances",
          },
        ]}
      />
      <div className="appHeader flex-fap-2">
        <AppCart user={user} />
        {
          user ? (
            <Button icon={<LogoutOutlined className="red-color" />} onClick={(e) => handleLogout(logout)}>
              {t("menu.logout")}
            </Button>
          ) :
            (
              <Button icon={<LoginOutlined className="green-color" />} onClick={(e) => navigate("/login")}>
                {t("login.title")}
              </Button>
            )
        }
      </div>
    </div>
  );
}
function AppCart({ user }) {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
  const { cartItems } = useCart();

  console.log('Cart items')
  console.log(cartItems);
  useEffect(() => {
    if (user) {
      getCart(user._id).then((res) => {
        // console.log(res)
        // setCartItems(res);
      });
    }
  }, [user]);
  const onConfirmOrder = (values) => {
    setCartDrawerOpen(false);
    setCheckoutDrawerOpen(false);
    message.success("Your order has been placed successfully.");
  };

  return (
    <div>
      <Badge
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        count={cartItems.length }
        className="soppingCartIcon"
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        title="Your Cart"
        contentWrapperStyle={{ width: 500 }}
      >
        <Table
          pagination={false}
          columns={[
            {
              title: "Title",
              dataIndex: ["item", "title"],
              render: (value) => {
                // return <span>{value}</span>;
                return <span>{ value.length > 60 ? 
                  value.substring(0, 60 - 3) + "..." : 
                  value}</span>;
               
              },
            },
            {
              title: "Price",
              dataIndex: ["item", "price"],
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    min={0}
                    defaultValue={value}
                    onChange={(value) => {
                      // setCartItems((pre) =>
                      //   pre.map((cart) => {
                      //     if (record.id === cart.id) {
                      //       cart.total = cart.price * value;
                      //     }
                      //     return cart;
                      //   })
                      // );
                    }}
                  ></InputNumber>
                );
              },
            },
            {
              title: "Total",
              render: (_,record) => {
                return <span>${record.item.price * record.quantity}</span>;
              },
            },
          ]}
          dataSource={cartItems}
          summary={(data) => {
            const total = data.reduce((pre, current) => {
              const itemTotal = (current.quantity || 0) * (current.item.price || 0);
    return pre + itemTotal;
              return pre + current.total;
            }, 0);
            return <h2>Total: ${total.toFixed(2)}</h2>;
          }}
        />
        <Button
          onClick={() => {
            setCheckoutDrawerOpen(true);
          }}
          type="primary"
          style={{float:'right', display:cartItems.length > 0? 'inline':'none'}}
        >
          Checkout Your Cart
        </Button>
      </Drawer>
      <Drawer
        open={checkoutDrawerOpen}
        onClose={() => {
          setCheckoutDrawerOpen(false);
        }}
        title="Confirm Order"
      >
        <Form onFinish={onConfirmOrder}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your full name",
              },
            ]}
            label="Full Name"
            name="full_name"
          >
            <Input placeholder="Enter your full name.." />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
            label="Email"
            name="your_name"
          >
            <Input placeholder="Enter your email.." />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your address",
              },
            ]}
            label="Address"
            name="your_address"
          >
            <Input placeholder="Enter your full address.." />
          </Form.Item>
          <Form.Item>
            <Checkbox defaultChecked disabled>
              Cash on Delivery
            </Checkbox>
          </Form.Item>
          <Typography.Paragraph type="secondary">
            More methods coming soon
          </Typography.Paragraph>
          <Button type="primary" htmlType="submit">
            {" "}
            Confirm Order
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}
export default AppHeader;
