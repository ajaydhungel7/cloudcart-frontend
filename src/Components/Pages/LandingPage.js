import React from "react";
import { Layout, Button, Typography, Row, Col, Card } from "antd";
import { ShoppingCartOutlined, CloudOutlined, SafetyOutlined, CreditCardOutlined, RocketOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      {/* Header */}
      <Header style={{ background: "#1890ff", padding: "10px 50px", color: "white" }}>
        <Title level={3} style={{ color: "white", margin: 0 }}>CloudCart</Title>
      </Header>

      {/* Hero Section */}
      <Content style={{ padding: "50px", textAlign: "center" }}>
        <Title>Shop Smarter, Shop Faster</Title>
        <Paragraph>Experience seamless cloud-powered eCommerce like never before.</Paragraph>
        <Button type="primary" size="large" onClick={()=>navigate("/login")}>Get Started</Button>
      </Content>

      {/* Features Section */}
      <Content style={{ padding: "50px" }}>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <CloudOutlined style={{ fontSize: "40px", color: "#1890ff" }} />
              <Title level={4}>Cloud-Powered</Title>
              <Paragraph>Fast and secure shopping experience.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <ShoppingCartOutlined style={{ fontSize: "40px", color: "#1890ff" }} />
              <Title level={4}>Easy Checkout</Title>
              <Paragraph>One-click checkout for convenience.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <SafetyOutlined style={{ fontSize: "40px", color: "#1890ff" }} />
              <Title level={4}>Secure Payments</Title>
              <Paragraph>Advanced security for worry-free transactions.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <CreditCardOutlined style={{ fontSize: "40px", color: "#1890ff" }} />
              <Title level={4}>Multiple Payment Options</Title>
              <Paragraph>Pay with cards, wallets, and more.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <RocketOutlined style={{ fontSize: "40px", color: "#1890ff" }} />
              <Title level={4}>Fast Delivery</Title>
              <Paragraph>Get your orders delivered quickly.</Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>

      {/* Call to Action Section */}
      <Content style={{ padding: "50px", textAlign: "center", background: "#f0f2f5" }}>
        <Title>Join CloudCart Today</Title>
        <Paragraph>Sign up now and enjoy exclusive deals and discounts!</Paragraph>
        <Button type="primary" size="large" onClick={()=>navigate("/signup")}>Sign Up Now</Button>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: "center" }}>
        CloudCart © {new Date().getFullYear()} - All Rights Reserved
      </Footer>
    </Layout>
  );
};

export default LandingPage;
