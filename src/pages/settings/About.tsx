import { FaSave } from "react-icons/fa";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Header from "../../components/layout/Header";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export const About: React.FC = () => {
  const [value, setValue] = useState({ title: "", description: "", _id: "" });

  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axiosSecure.get("/pages?type=ABOUT");

        setValue(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAbout();
  }, []);

  const handleAbout = async (e: any) => {
    try {
      e.preventDefault();
      await axiosSecure.patch(`/pages/${value._id}`, {
        description: value.description,
        title: e.target.title.value,
      });

      Swal.fire({
        icon: "success",
        title: "Updated successfully",
        text: "About content updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Faild to update",
        text: "Something went wrong",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  return (
    <>
      <Header title="About"></Header>
      <div>
        <h2 className="text-2xl font-semibold my-5">{value.title}</h2>
      </div>

      <form onSubmit={handleAbout} action="">
        <input
          type="text"
          placeholder="Type here"
          name="title"
          className="input border w-full bg-white border-slate-300"
          defaultValue={value.title}
        />
        <div className="bg-white min-h-96">
          <ReactQuill
            onChange={(content) =>
              setValue((prev) => ({ ...prev, description: content }))
            }
            className="min-h-96"
            value={value.description}
          />
        </div>
        <button className="btn bg-accent border-0 my-3 text-white flex items-center gap-2">
          <FaSave></FaSave>
          Save
        </button>
      </form>
    </>
  );
};
