import type React from "react";
import logo from "../assets/images/logo.png";
import { Link, Navigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth.tsx";

const Login: React.FC = () => {
  const { adminLogin, token } = useAuth() as any;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
      return Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please enter both email and password",
      });
    }

    try {
      await adminLogin(email, password);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Something went wrong",
      });
    }
  };

  // If logged in → Redirect to home
  if (token) return <Navigate to="/" replace />;

  return (
    <div className="bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="hero bg-base-200 min-h-screen flex sm:flex-row flex-col justify-evenly">
          <div>
            <img className="w-[300px] rounded-4xl" src={logo} alt="Logo" />
          </div>

          <div className="flex flex-col rounded-md sm:p-10 sm:w-xl">
            <div className="mb-8">
              <h1 className="my-3 text-4xl font-bold">Sign in to Account!</h1>
              <p className="text-sm text-white">
                Please enter your email and password to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@email.com"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm ">
                      Password
                    </label>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="*****"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                  />

                  <div className="m-2">
                    <Link to={"/forgot-password"}>Forgot password?</Link>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold rounded-md bg-accent dark:text-gray-50"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
