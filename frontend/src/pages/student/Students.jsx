import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Spin, Alert, Input } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import StudentTable from "./StudentTable";
import { useGetStudentsQuery } from "../../features/student/studentApi";


const Students = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState({ bookName: "", writer: "" });

  const { data, isLoading, isError } = useGetStudentsQuery({
    page,
    limit,
    search,
  });
  const { data: students = [], meta = {} } = data || {};

  if (isLoading) return <Spin size="large" />;
  if (isError) return <Alert title="Error loading students" type="error" />;

  return (
    <>
      <div className="flex justify-between mb-2">
        <Input.Search
          placeholder="Search students..."
          onSearch={(value) => setSearch(value)}
          style={{ width: 300 }}
          allowClear
        />
        <Button
          type="primary"
          onClick={() => navigate("/students/create")}
          icon={<PlusOutlined />}
        >
          Add Student
        </Button>
      </div>

      <StudentTable
        students={students}
        meta={meta}
        page={page}
        limit={limit}
        onChangePage={(p, l) => {
          setPage(p);
          setLimit(l);
        }}
      />

      <Outlet />
    </>
  );
};

export default Students;
