import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tags = {
  Books: "Books", Students: "Students", Users: "Users"
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: Object.values(tags),
  endpoints: () => ({}),
});

export default api;
