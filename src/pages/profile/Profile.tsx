import React, { useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";

import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Header from "../../components/layout/Header";

export const Profile: React.FC = () => {
  const axiosSecure = useAxiosSecure();

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<{
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
    address: string;
    avatar: string;
  }>({
    _id: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    avatar: "",
  });

  // ------------------ FETCH USER PROFILE ------------------
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axiosSecure.get("/users/profile");
        const data = res.data.data;
        setUserData({
          _id: data._id,
          username: data.username,
          email: data.email,
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          avatar: data.avatar || "",
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Failed to fetch profile",
          text: "Please try again later.",
        });
      }
    };
    fetchUserProfile();
  }, []);

  // ------------------ UPDATE PROFILE INFO ------------------
  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = e.currentTarget;
      const updatedData = {
        username: form.username.value,
        phoneNumber: form.phoneNumber.value,
        address: form.address.value,
      };

      await axiosSecure.patch(`/users/profile`, updatedData);

      setUserData((prev) => ({ ...prev, ...updatedData }));
      setIsEditing(false);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile information has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Could not update profile. Please try again.",
      });
    }
  };

  // ------------------ UPDATE AVATAR ------------------
  const handleAvatarUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await axiosSecure.post("/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUserData((prev) => ({ ...prev, avatar: res.data.data.avatar }));

      Swal.fire({
        icon: "success",
        title: "Avatar Updated",
        text: "Your profile picture has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Could not update avatar. Try again.",
      });
    }
  };

  return (
    <>
      <Header title="Profile" />
      <div className="max-w-full mx-auto p-6 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#000]">
            Personal Information
          </h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-3 py-1 rounded"
            >
              <FaEdit /> Edit
            </button>
          )}
        </div>

        <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 gap-5">
          <div className="grid md:grid-cols-10 gap-5">
            {/* Avatar */}
            <div className="col-span-2 border-1 border-slate-300 flex flex-col justify-center items-center gap-5 p-10 md:py-[60px] rounded-lg">
              <div className="relative w-32 h-32 rounded-full overflow-hidden group hover:cursor-pointer">
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt="Avatar"
                    className={`object-cover w-full h-full transition-transform duration-300 group-hover:scale-110`}
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) =>
                      e.target.files?.[0] &&
                      handleAvatarUpload(e.target.files[0])
                    }
                  />
                )}
              </div>
              <h2 className="text-xl">{userData.username}</h2>
            </div>

            {/* Profile Fields */}
            <div className="col-span-8 space-y-3">
              <div>
                <label className="block mb-1 text-sm text-gray-700">Name</label>
                <input
                  disabled={!isEditing}
                  name="username"
                  type="text"
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                  defaultValue={userData.username}
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Email
                </label>
                <input
                  disabled
                  type="email"
                  className="border border-gray-300 rounded px-3 py-2 w-full bg-gray-100"
                  value={userData.email}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Phone
                </label>
                <input
                  disabled={!isEditing}
                  name="phoneNumber"
                  type="text"
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                  defaultValue={userData.phoneNumber}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Address
                </label>
                <input
                  disabled={!isEditing}
                  name="address"
                  type="text"
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                  defaultValue={userData.address}
                />
              </div>

              {isEditing && (
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-accent hover:bg-primary/90 text-white px-3 py-2 rounded w-full"
                >
                  <FaSave /> Save Changes
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
