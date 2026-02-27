import React, { useEffect } from "react";
import { Drawer, Form, Input, Space, Button } from "antd";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  useAddBookMutation,
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../../features/book/bookApi";
import { toast } from "react-toastify";

const BookForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [form] = Form.useForm();

  const open =
    location.pathname.includes("/books/create") ||
    location.pathname.includes("/books/edit");

  const { data } = useGetBookByIdQuery(id, { skip: !id });
  const book = data?.data || {};

  const [updateBook] = useUpdateBookMutation();
  const [addBook] = useAddBookMutation();

  const onClose = () => navigate("/books");

  const handleSubmit = async (values) => {
    try {
      if (id) {
        await updateBook({ id, ...values }).unwrap();
        toast.success("Book updated successfully!");
      } else {
        await addBook(values).unwrap();
        toast.success("Book created successfully!");
      }
      navigate("/books");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // Prefill form when editing
  useEffect(() => {
    if (book && id) {
      form.setFieldsValue({
        bookName: book.bookName,
        price: book.price,
        publishedYear: book.publishedYear,
        writer: book.writer,
      });
    }
  }, [book, id, form]);

  return (
    <Drawer
      title={`${id ? "Update" : "Add"} Book`}
      open={open}
      onClose={onClose}
      size="large"
      footer={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit" form="bookForm">
            Save
          </Button>
        </Space>
      }
    >
      <Form form={form} id="bookForm" layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="bookName"
          label="Book Name"
          rules={[{ required: true, message: "Please enter book name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="publishedYear"
          label="Published Year"
          rules={[{ required: true, message: "Please enter year" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="writer"
          label="Writer"
          rules={[{ required: true, message: "Please enter writer name" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default BookForm;
