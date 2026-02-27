import React from "react";
import { Table, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteStudentMutation } from "../../features/student/studentApi";

const StudentTable = ({ students, meta, page, limit, onChangePage }) => {
  const navigate = useNavigate();
  const [deleteStudent] = useDeleteStudentMutation();

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id).unwrap();
      toast.success("Student deleted successfully!");
    } catch (error) {
      toast.error("Delete failed!");
    }
  };

  const studentColumns = [
    {
      title: "S.No",
      key: "sno",
      render: (_, __, index) => (page - 1) * limit + index + 1,
    },
    { title: "Student Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
       { title: "Married", dataIndex: "isMarried", render: v => v ? "Yes" : "No" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Hobbies", dataIndex: "hobbies", render: h => h?.join(", ") },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => navigate(`/students/edit/${record._id}`)}
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
    <Table
      columns={studentColumns}
      rowKey="_id"
      dataSource={students}
      pagination={{
        current: page,
        pageSize: limit,
        total: meta.total,
        onChange: (p, l) => onChangePage(p, l),
        showSizeChanger: true,
      }}
    />
  );
};

export default StudentTable;
