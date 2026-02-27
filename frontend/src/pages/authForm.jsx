/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoginMutation, useSignUpMutation } from '../features/users/userApi';

const AuthForm = () => {
    const { type } = useParams(); // "login" or "signup"
    const navigate = useNavigate();

    // RTK Query mutations
    const [signUp, { isLoading: isSigningUp, error: signUpError }] = useSignUpMutation();
    const [login, { isLoading: isLoggingIn, error: loginError }] = useLoginMutation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        // Clear form when type changes
        setFormData({
            name: "",
            email: "",
            password: ""
        });
    }, [type]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (type === "signup") {
                const res = await signUp(formData).unwrap();
                console.log("Signup successful:", res);
            } else {
                const res = await login(formData).unwrap();
                console.log("Login successful:", res);
            }
            navigate("/"); // redirect after success (home page)
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const toggleAuthType = () => {
        navigate(type === "login" ? "/auth/signup" : "/auth/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {type === "login" ? "Login" : "Sign Up"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {type === "signup" && (
                        <div>
                            <label className="block mb-1 font-medium" htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block mb-1 font-medium" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="********"
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSigningUp || isLoggingIn}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
                    >
                        {type === "login" ? (isLoggingIn ? "Logging in..." : "Login") : (isSigningUp ? "Signing up..." : "Sign Up")}
                    </button>

                    {(loginError || signUpError) && (
                        <p className="text-red-500 mt-2 text-center">
                            {loginError?.data?.message || signUpError?.data?.message || "Something went wrong"}
                        </p>
                    )}
                </form>

                <p className="mt-4 text-center text-gray-600">
                    {type === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={toggleAuthType}
                    >
                        {type === "login" ? "Sign Up" : "Login"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
