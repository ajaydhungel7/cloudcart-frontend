import React, { useState, useEffect } from "react";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Input, notification } from "antd";
import { Button } from "../Common/Button";
import "./Login.css";
import { useAuth } from "../../context/Auth";
import { useLanguage } from "../../context/Language";

export default function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Use our new Auth context that now provides loginUser instead of Firebase functions.
  const { user, setUser, loginUser } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    if (user) {
      navigate("/category");
    }
  }, [user, navigate]);

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const userLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggingIn(true);
      loginUser(username, password, setIsLoggingIn)
    } else {
      notification.error({
        message: "Login Error",
        description: "Email or Password field is empty",
      });
    }
  };

  const bodyContainer = {
    minWidth: "360px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "15px",
  };

  return (
    <div style={bodyContainer}>
      <h1 style={{ textAlign: "center", margin: "20px 0px", textTransform: "uppercase" }}>
        {t("login.title")}
      </h1>
      <div className="loginTextDescription" style={{ textAlign: "center", marginBottom: "10px" }}>
        {t("login.info")}
      </div>
      <form onSubmit={userLogin}>
        <div style={{ margin: "10px auto" }}>
          <Input
            size="large"
            type="email"
            placeholder={t("placeholder.email")}
            prefix={<UserOutlined />}
            style={{ padding: "10px" }}
            onChange={updateUsername}
          />
        </div>
        <div style={{ margin: "0px auto", position: "relative" }}>
          <Input.Password
            size="large"
            placeholder={t("placeholder.password")}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            style={{ padding: "10px" }}
            className="mBottom"
            onChange={updatePassword}
          />
          <div style={{ position: "absolute", right: "0px", cursor: "pointer" }}>
            <Link to="/forgot-password" style={{ color: "unset", fontWeight: "600" }}>
              {t("login.forgotPassword")}
            </Link>
          </div>
        </div>
        <div
          className="flex-container"
          style={{ justifyContent: "center", backgroundColor: "unset", marginTop: "20px" }}
        >
          <Button
            type="primary"
            style={{ width: "100%" }}
            icon={isLoggingIn && <LoadingOutlined />}
            iconPosition={"center"}
            isLoggingIn={isLoggingIn}
            disabled={isLoggingIn}
            htmlType="submit"
          >
            {isLoggingIn ? "" : t("button.login")}
          </Button>
        </div>
        <div style={{ textAlign: "center" }}>
          {t("login.signup")}{<br /> } { <br /> }
          <span style={{ fontStyle: "italic", cursor: "pointer" }}>
            <Link to="/signup" style={{ color: "unset", fontWeight: "600" }}>
              {t("login.create")}
            </Link>
          </span>
        </div>
      </form>
      <div
        style={{
          fontSize: "14px",
          color: "grey",
          margin: "20px",
          fontWeight: "600",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {t("footer.copyright")} © {new Date().getFullYear()} <img src="logo-kneg.png" width="10px" alt="KNEG" />
      </div>
    </div>
  );
}
