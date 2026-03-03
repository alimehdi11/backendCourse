import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tags = {
  Books: "Books", Students: "Students", Users: "Users"
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
     prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");

      const token = getState().user?.token;
      // console.log(token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: Object.values(tags),
  endpoints: () => ({}),
});

export default api;
