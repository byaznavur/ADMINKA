import { useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./AdminLayout.scss";
import { Button, Layout, Menu, Modal, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IS_LOGIN } from "../../constants";
import PropTypes from "prop-types";

const { Header, Sider, Content } = Layout;
const AdminLayout = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const locaiton = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const logout = () => {
    Modal.confirm({
      title: "Do you want to log out?",

      onOk: () => {
        navigate("/login");
        setIsLogin(false);
        localStorage.removeItem(IS_LOGIN);
      },
    });
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="admin-logo">
          <h3>{collapsed ? "AA " : "ADMINKA"}</h3>
        </div>
        <Menu
          className="admin-aside"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[locaiton.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <UserOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/teachers",
              icon: <TeamOutlined />,
              label: <Link to="/teachers">Teachers</Link>,
            },
            {
              key: "/students",
              icon: <TeamOutlined />,
              label: <Link to="/students">Students</Link>,
            },
            {
              key: "4",
              icon: <LogoutOutlined />,
              label: (
                <Button onClick={logout} danger type="primary">
                  Logout
                </Button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="admin-header"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="admin-main"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

AdminLayout.propTypes = {
  setIsLogin: PropTypes.func,
};
export default AdminLayout;
