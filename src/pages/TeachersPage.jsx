import {
  Button,
  Checkbox,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Table,
} from "antd";
import { Fragment, useEffect, useState } from "react";
import request from "../server";

const TeachersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      let { data } = await request.get("/teachers");
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
    setSelected(null);
  };
  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      await request.post("/teachers", values);
      getData();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const editTeacher = async (id) => {
    try {
      setIsModalOpen(true);
      setSelected(id);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "FirstName",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "LastName",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },

    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (data) => <Image src={data} alt="Avatar" height={40} />,
    },
    {
      title: "IsMarried",
      dataIndex: "isMarried",
      key: "isMarried",
      render: (isMarried) => <span>{isMarried ? "Yes" : "No"}</span>,
    },

    {
      title: "Action",
      key: "action",
      dataIndex: "id",
      render: (data) => (
        <Space size="middle">
          <Button onClick={() => editTeacher(data)} type="primary">
            Edit
          </Button>
          <Button danger type="primary">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex justify="space-between" align="center">
            <h2>Teachers({data.length})</h2>
            <Button onClick={showModal} type="dashed">
              Add Teachers
            </Button>
          </Flex>
        )}
        loading={loading}
        columns={columns}
        dataSource={data}
      />
      ;
      <Modal
        maskClosable={false}
        title="Teacher Data"
        open={isModalOpen}
        onOk={handleOk}
        okText={selected === null ? "Add Teacher" : "Save Teacher"}
        onCancel={closeModal}
      >
        <Form
          name="teacher"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="FirstName"
            name="firstname"
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
            label="LastName"
            name="lastname"
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
            label="Address"
            name="address"
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
            label="Age"
            name="age"
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
            label="Salary"
            name="salary"
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
            label="Level"
            name="level"
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
            label="Avatar"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="isMarried" valuePropName="checked" label={null}>
            <Checkbox>isMarried</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};
export default TeachersPage;
