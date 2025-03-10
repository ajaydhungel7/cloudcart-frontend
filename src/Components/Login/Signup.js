import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Checkbox, Input, Spin, notification, Typography } from "antd";
import { Button } from "../Common/Button";
import "./Signup.css";
import { useAuth } from "../../context/Auth";
import { useLanguage } from "../../context/Language";

const { Text } = Typography;

export default function Signup() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const { user, registerUser } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/category");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const { firstName, lastName, email, password, cPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const signUpEmailPass = (e) => {
    e.preventDefault();
    if (!agreed) {
      notification.error({
        message: "Agreement Error",
        description: "Please view terms and conditions",
      });
      return;
    }
    if (!email) {
      notification.error({
        message: "Signup Error",
        description: "Email is empty",
      });
      return;
    }
    if (!firstName) {
      notification.error({
        message: "Signup Error",
        description: "First Name is empty",
      });
      return;
    }
    if (!lastName) {
      notification.error({
        message: "Signup Error",
        description: "Last Name is empty",
      });
      return;
    }
    if (password !== cPassword) {
      notification.error({
        message: "Signup Error",
        description: "Passwords don't match",
      });
      return;
    } else {
      setIsLoading(true);
      // Combine firstName and lastName into one name field for registration
      registerUser(email, password, firstName.trim(), lastName.trim())
        .then(() => {
          notification.success({
            message: "Signup Successful",
            description: "Registration successful. Please log in.",
          });
          navigate("/login");
          setIsLoading(false);
        })
        .catch((error) => {
          const errorMsg = error.response?.data?.message || "Signup failed";
          notification.error({
            message: "Signup Error",
            description: errorMsg,
          });
          setIsLoading(false);
        });
    }
  };

  const loginContainer = {
    minWidth: "360px",
    padding: "15px",
    backgroundColor: "white",
    borderRadius: "15px",
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleCheckboxChange = (e) => {
    setAgreed(e.target.checked);
  };

  const showTermsModal = (e) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  const handleAgree = () => {
    setAgreed(true);
    setIsModalVisible(false);
  };

  return (
    <div style={loginContainer}>
      <Spin spinning={isLoading}>
        <h1 style={{ textAlign: "center", margin: "20px 0px" }}>{t("signup.title")}</h1>
        <div className="loginTextDescription" style={{ textAlign: "center", marginBottom: "10px" }}>
          {t("signup.info")}
        </div>
        <form onSubmit={signUpEmailPass}>
          <div style={{ display: "flex", width: "90%", margin: "0px auto" }}>
            <Input
              size="large"
              placeholder={t("placeholder.firstName")}
              prefix={<UserOutlined />}
              style={{ padding: "10px", marginRight: "5px" }}
              className="mBottom"
              name="firstName"
              value={firstName}
              onChange={handleChange}
            />
            <Input
              size="large"
              placeholder={t("placeholder.lastName")}
              style={{ padding: "10px" }}
              className="mBottom"
              name="lastName"
              value={lastName}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: "90%", margin: "5px auto" }}>
            <Input
              size="large"
              placeholder={t("placeholder.email")}
              type="email"
              prefix={<MailOutlined />}
              style={{ padding: "10px" }}
              className="mBottom"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: "90%", margin: "5px auto" }}>
            <Input.Password
              size="large"
              placeholder={t("placeholder.password")}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              style={{ padding: "10px" }}
              className="mBottom"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: "90%", margin: "5px auto 20px auto" }}>
            <Input.Password
              size="large"
              status={password !== cPassword ? "error" : ""}
              placeholder={t("placeholder.cPassword")}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              style={{ padding: "10px" }}
              className="mBottom"
              name="cPassword"
              value={cPassword}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: "90%", margin: "auto" }}>
            <Checkbox checked={agreed} onChange={handleCheckboxChange}>
              I have read and agree to the GDPR Policy{" "}
              <Button onClick={showTermsModal}>Terms and Conditions</Button>
            </Checkbox>
          </div>
          <div className="flex-container" style={{ justifyContent: "center", backgroundColor: "unset" }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              {t("button.signup")}
            </Button>
          </div>
        </form>
        <div style={{ textAlign: "center" }}>
          {t("signup.logininfo")}{" "}
          <span style={{ fontStyle: "italic", cursor: "pointer" }}>
            <Link to="/login" style={{ color: "unset", fontWeight: "600" }}>
              {t("signup.loginLink")}
            </Link>
          </span>
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "grey",
            margin: "10px",
            fontWeight: "600",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {t("footer.copyright")} © {new Date().getFullYear()} <img src="logo-kneg.png" width="10px" alt="KNEG" />
        </div>
      </Spin>
    </div>
  );
}
