import { Button, Checkbox, Flex, Form, Input, message } from "antd";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { IS_LOGIN } from "../constants";

const LoginPage = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    const { username, password } = values;

    if (username !== "" && password !== "") {
      setIsLogin(true);
      localStorage.setItem(IS_LOGIN, true);
      navigate("/dashboard");
    } else {
      message.error("Please enter a username and password !!!");
    }
  };
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        height: "100vh",
      }}
    >
      <Form
        name="login"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

LoginPage.propTypes = {
  setIsLogin: PropTypes.func,
};
export default LoginPage;
