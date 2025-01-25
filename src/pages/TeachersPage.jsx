import {
  Button,
  Checkbox,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";
import { Fragment, useCallback, useEffect, useState } from "react";
import request from "../server";
import { LIMIT } from "../constants";

const TeachersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  const getData = useCallback(async () => {
    try {
      setLoading(true);
      let params = {
        page: activePage,
        limit: LIMIT,
      };
      let { data } = await request.get("/teachers", { params });
      let { data: totalData } = await request.get("teachers");

      setTotal(totalData.length);
      setData(data);

      data = data.map((el) => {
        data.key = data.id;
        return el;
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [activePage]);
  useEffect(() => {
    getData();
  }, [getData]);

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
    setSelected(null);
  };
  const handleOk = async () => {
    try {
      setIsLoadingModal(true);

      let values = await form.validateFields();
      if (selected === null) {
        await request.post("/teachers", values);
      } else {
        await request.put(`/teachers/${selected}`, values);
      }
      getData();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingModal(false);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const editTeacher = async (id) => {
    try {
      setIsModalOpen(true);
      setSelected(id);
      let { data } = await request.get(`teachers/${id}`);
      form.setFieldsValue(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTeacher = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete ?",
      onOk: async () => {
        await request.delete(`/teachers/${id}`);
        getData();
      },
    });
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
          <Button onClick={() => deleteTeacher(data)} danger type="primary">
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
            <h2>Teachers({total})</h2>
            <Button onClick={showModal} type="dashed">
              Add Teachers
            </Button>
          </Flex>
        )}
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <Pagination
        current={activePage}
        total={total}
        onChange={(page) => setActivePage(page)}
      />
      <Modal
        maskClosable={false}
        confirmLoading={isLoadingModal}
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
