import React from "react";
import { Table, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDeleteBookMutation } from "../../features/book/bookApi";
import { toast } from "react-toastify";

const BookTable = ({ books, meta, page, limit, onChangePage }) => {
  const navigate = useNavigate();
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id) => {
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted successfully!");
    } catch (error) {
      toast.error("Delete failed!");
    }
  };

  const bookColumns = [
    {
      title: "S.No",
      key: "sno",
      render: (_, __, index) => (page - 1) * limit + index + 1,
    },
    { title: "Book Name", dataIndex: "bookName", key: "bookName" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Published Year",
      dataIndex: "publishedYear",
      key: "publishedYear",
    },
    { title: "Writer", dataIndex: "writer", key: "writer" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => navigate(`/books/edit/${record._id}`)}
          >
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="mt-5">
    <Table
    columns={bookColumns}
    rowKey="_id"
    dataSource={books}
    pagination={{
      current: page,
      pageSize: limit,
      total: meta.total,
      onChange: (p, l) => onChangePage(p, l),
      showSizeChanger: true,
    }}
    />
    </div>
  );
};

export default BookTable;
