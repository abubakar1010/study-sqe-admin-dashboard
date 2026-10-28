import logo from "../assets/images/logo.png";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function ForgotPassword() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Missing Email Address",
        text: "Please enter your email.",
      });
      return;
    }

    try {
      // Example endpoint (adjust as needed)
      await axiosSecure.post("/auth/forgot-password", { email });

      Swal.fire({
        icon: "success",
        title: "OTP Sent!",
        text: "An OTP has been sent to your email address.",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate(`/verify-otp`, { state: { email: email } });
      });

      // Optionally redirect to verify OTP page:
      // navigate("/verify-otp");
    } catch (err) {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Request Failed",
      //     text:
      //       err?.response?.data?.message ||
      //       "Something went wrong while sending OTP.",
      //   });
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
                Forgot Password?
              </h1>
              <p className="text-sm text-white">
                Enter your email registered email address to receive an OTP.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="emial"
                    className="block mb-2 text-sm text-white"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="test@test.com"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3 font-semibold rounded-md bg-accent dark:text-gray-50"
                  >
                    Send OTP
                  </button>
                </div>

                <p className="text-sm text-center text-white">
                  Remember your password?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-blue-400 cursor-pointer hover:underline"
                  >
                    Go back to Login
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
