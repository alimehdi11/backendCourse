import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLoginMutation, useSignUpMutation } from "../features/users/userApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getUser } from "../features/users/userSlice";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.?&])[A-Za-z\d@$!%*.?&]{8,}$/;

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type } = useParams();

  const isLogin = type === "login";

  const [login] = useLoginMutation();
  const [signUp] = useSignUpMutation();

  /* =========================
     Dynamic Validation Schema
  ========================== */
  const validationSchema = useMemo(() => {
    const schema = {
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Password is required"),
    };

    if (!isLogin) {
      schema.name = Yup.string()
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required("Name is required");

      schema.password = schema.password.matches(
        passwordRegex,
        "Must include uppercase, lowercase, number & special character"
      );
    }

    return Yup.object(schema);
  }, [isLogin]);

  /* =========================
     Dynamic Initial Values
  ========================== */
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  /* =========================
     Formik
  ========================== */
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const apiCall = isLogin ? login : signUp;
        const res = await apiCall(values).unwrap();

        dispatch(getUser(res.data));
        toast.success(res.message || "Success");

        navigate("/dashboard");
        resetForm();
      } catch (err) {
        toast.error(err?.data?.message || "Something went wrong");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { isSubmitting, handleBlur, handleChange, handleSubmit, values, touched, errors } = formik;

  /* =========================
     Fields Config (Loop Based)
  ========================== */
  const fields = useMemo(
    () =>
      [
        !isLogin && {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Your Name",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      ].filter(Boolean),
    [isLogin]
  );

  /* =========================
     Derived UI Values
  ========================== */
  const buttonText = isSubmitting
    ? isLogin
      ? "Logging in..."
      : "Signing up..."
    : isLogin
      ? "Login"
      : "Sign Up";

  const toggleAuthType = () =>
    navigate(isLogin ? "/auth/signup" : "/auth/login");

  /* =========================
     UI
  ========================== */
  return (
    <div className="min-h-[90.7vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <label htmlFor={name} className="block mb-1 font-medium">
                {label}
              </label>

              <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values[name] || ""}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {touched[name] && errors[name] && (
                <p className="text-red-500 mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            {buttonText}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={toggleAuthType}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
