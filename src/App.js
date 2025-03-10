import "./App.css";
import "antd/dist/reset.css";
import NavBar from "./Components/Common/NavBar";
import PublicRoutes from "./Components/Routes";
import { ConfigProvider } from "antd";
import { CartProvider } from "./context/Cart";

function App() {
  let appTheme = {
    border: '1px solid red',
    token: {
      // Seed Token
      colorPrimary: "#0069cb",
      borderRadius: 2,
      // Alias Token
      colorBgContainer: "rgba(101,181,255,0.05)",
    },
    components: {
      Select: {
        borderRadiusOuter: "4px",
      }
    },
  };

  return (
    <ConfigProvider theme={appTheme}>
      <CartProvider>
        <NavBar />
        <PublicRoutes />
      </CartProvider>
    </ConfigProvider>
  );
}

export default App;
