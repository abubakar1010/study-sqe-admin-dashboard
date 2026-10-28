import React from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/layout/Header";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

export const ChangePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { setToken } = useAuth() as { setToken: (token: string) => void };
  const newPassword = watch("newPassword");

  const onSubmit = async (data: Record<string, string>) => {
    try {
      const res = await axiosSecure.post("/auth/change-password", {
        currentPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      // the server revokes older tokens on password change, so keep the fresh one
      setToken(res.data.data.accessToken);

      Swal.fire({
        icon: "success",
        title: "Password Updated",
        text: "Your password has been successfully updated.",
        timer: 1500,
        showConfirmButton: false,
      });

      reset();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error?.response?.data?.message ||
          "Something went wrong while updating the password.",
      });
    }
  };

  return (
    <>
      <Header title="Change Password"></Header>
      <div className="max-w-lg  mt-10 bg-white p-6 rounded-2xl shadow-md text-black">
        <h2 className="text-xl font-semibold mb-5 text-center text-white">
          Change Password
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Old Password */}
          <div>
            <label className="block mb-1 font-medium">Old Password</label>
            <input
              type="password"
              placeholder="Enter your old password"
              {...register("oldPassword", {
                required: "Old password is required",
              })}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.oldPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">
                {typeof errors.oldPassword?.message === "string"
                  ? errors.oldPassword.message
                  : ""}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block mb-1  font-medium">New Password</label>
            <input
              type="password"
              placeholder="Enter a new password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {typeof errors.newPassword?.message === "string"
                  ? errors.newPassword.message
                  : ""}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1  font-medium">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {typeof errors.confirmPassword?.message === "string"
                  ? errors.confirmPassword.message
                  : ""}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white py-2 rounded-md hover:bg-[#171819] transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </>
  );
};
