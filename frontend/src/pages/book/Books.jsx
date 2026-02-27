import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Spin, Alert, Input } from "antd";
import BookTable from "./BookTable";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../../features/book/bookApi";

const Books = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useGetBooksQuery({
    page,
    limit,
    search,
  });
  const { data: books = [], meta = {} } = data || {};

  if (isLoading) return <Spin size="large" />;
  if (isError) return <Alert title="Error loading books" type="error" />;

  return (
    <>
      <div className="flex justify-between mb-2">
        <Input.Search
          placeholder="Search books..."
          onSearch={(value) => setSearch(value)}
          style={{ width: 300 }}
          allowClear
        />
        <Button
          type="primary"
          onClick={() => navigate("/books/create")}
          icon={<PlusOutlined />}
        >
          Add Book
        </Button>
      </div>

      <BookTable
        books={books}
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

export default Books;
