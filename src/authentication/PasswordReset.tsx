import logo from "../assets/images/logo.png";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

export default function PasswordReset() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.resetPasswordToken;


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      await axiosSecure.post("/auth/reset-password", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Password Updated!",
        text: "Your password has been successfully reset.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/login");
      });

      reset();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Reset Failed",
        text:
          err?.response?.data?.message ||
          "Something went wrong while resetting your password.",
      });
    }
  };

  return (
    <div className="bg-[#191919]">
      <div className="max-w-7xl mx-auto">
        <div className="hero bg-base-200 min-h-screen flex justify-evenly">
          <div>
            <img className="w-[300px] rounded-4xl" src={logo} alt="Logo" />
          </div>

          <div className="flex flex-col rounded-md sm:p-10 w-xl bg-[#191919]">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl font-bold text-white">
                Reset Password
              </h1>
              <p className="text-sm text-white"></p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
              {/* New Password */}
              <div>
                <label className="block mb-2 text-sm text-white">
                  New Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {(errors.password as any).message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-2 text-sm text-white">
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="Confirm new password"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {(errors.confirmPassword as any).message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md bg-accent dark:text-gray-50"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
