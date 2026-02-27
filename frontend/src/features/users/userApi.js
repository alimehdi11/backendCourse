import { apiRequest } from "../../utils/helperFunction";
import api from "../baseApi";


const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // ================= Signup =================
        signUp: builder.mutation({
            query: (newUser) => apiRequest("/users/signup", "POST", newUser),
        }),

        // ================= Login =================
        login: builder.mutation({
            query: (credentials) => apiRequest("/users/login", "POST", credentials),
        }),

    }),
});

export const {
    useSignUpMutation,
    useLoginMutation,

} = userApi;

export default userApi;
