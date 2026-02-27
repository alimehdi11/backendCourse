import React, { useEffect } from "react";
import { Drawer, Form, Input, Space, Button, InputNumber, Switch } from "antd";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import {
  useAddStudentMutation,
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
} from "../../features/student/studentApi";

const StudentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [form] = Form.useForm();

  const open =
    location.pathname.includes("/students/create") ||
    location.pathname.includes("/students/edit");

  const { data } = useGetStudentByIdQuery(id, { skip: !id });
  const student = data?.data || {};

  const [updateStudent] = useUpdateStudentMutation();
  const [addStudent] = useAddStudentMutation();

  const onClose = () => navigate("/students");

  const handleSubmit = async (values) => {
    try {
      if (id) {
        await updateStudent({ id, ...values }).unwrap();
        toast.success("Student updated successfully!");
      } else {
        await addStudent(values).unwrap();
        toast.success("Student created successfully!");
      }
      navigate("/students");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (student && id) {
      form.setFieldsValue({
        name: student.name,
        age: student.age,
        surname: student.surname,
        isMarried: student.isMarried,
        address: student.address,
        hobbies: student.hobbies,
      });
    }
  }, [student, id, form]);

  return (
    <Drawer
      title={`${id ? "Update" : "Add"} Student`}
      open={open}
      onClose={onClose}
      size="large"
      footer={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit" form="studentForm">
            Save
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        id="studentForm"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Student Name"
          rules={[{ required: true, message: "Please enter student name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="age"
          label="Age"
          rules={[{ required: true, message: "Please enter age" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="surname"
          label="Surname"
          rules={[{ required: true, message: "Please enter surname" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="isMarried"
          label="Are you married?"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter address" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="hobbies"
          label="Hobbies"
          rules={[{ required: true, message: "Please enter hobbies" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default StudentForm;
