import logo from "../assets/images/logo.png";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

export default function VerifyOtp() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  type VerifyOtpForm = { otp: string };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpForm>();

  const onSubmit = async (data: { otp: string }) => {
    try {
      // API call to verify OTP
      const res = await axiosSecure.post(`/auth/verify-otp`, {
        email,
        otp: data.otp,
        type: "PASSWORD_RESET",
      });

      Swal.fire({
        icon: "success",
        title: "OTP Verified!",
        text: "You can now reset your password.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate(`/reset-password`, {
          state: {
            email: email,
            resetPasswordToken: res.data.data.resetPasswordToken,
          },
        }); // redirect to reset page
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "OTP Verification Failed",
        text:
          err?.response?.data?.message ||
          "Invalid OTP, please check and try again.",
      });
    }
  };

  return (
    <div className="bg-[#191919] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-[#1f1f1f] rounded-xl shadow-md">
        <div className="text-center mb-6">
          <img className="w-28 mx-auto rounded-2xl" src={logo} alt="Logo" />
          <h1 className="mt-4 text-2xl font-bold text-white">Verify OTP</h1>
          <p className="text-sm text-gray-300 mt-1">
            Enter the OTP sent to <strong>{email}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm text-white">OTP</label>
            <input
              type="text"
              {...register("otp", { required: "OTP is required" })}
              placeholder="Enter OTP"
              className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-800"
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold rounded-md bg-accent text-white"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
