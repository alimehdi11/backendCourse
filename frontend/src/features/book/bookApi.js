import { apiRequest } from "../../utils/helperFunction";
import api, { tags } from "../baseApi";
const { Books } = tags;
const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => {
        let queryStr = `?page=${page}&limit=${limit}`;
        if (search) queryStr += `&bookName=${search}`;
        return apiRequest(`/books${queryStr}`);
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((book) => ({ type: Books, id: book._id })),
              { type: "Books", id: "LIST" },
            ]
          : [{ type: "Books", id: "LIST" }],
    }),

    getBookById: builder.query({
      query: (id) => apiRequest(`/books/${id}`),
      providesTags: (result, error, id) => [{ type: Books, id }],
    }),

    addBook: builder.mutation({
      query: (newBook) => apiRequest("/books", "POST", newBook),
      invalidatesTags: [{ type: Books, id: "LIST" }],
    }),

    updateBook: builder.mutation({
      query: ({ id, ...data }) => apiRequest(`/books/${id}`, "PUT", data),
      invalidatesTags: (result, error, { id }) => [
        { type: Books, id },
        { type: Books, id: "LIST" },
      ],
    }),

    deleteBook: builder.mutation({
      query: (id) => apiRequest(`/books/${id}`, "DELETE"),
      invalidatesTags: (result, error, id) => [
        { type: Books, id },
        { type: Books, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;

export default bookApi;
