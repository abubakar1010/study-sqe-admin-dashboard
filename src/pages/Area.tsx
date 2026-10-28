import React, { useState } from "react";
import Header from "../components/layout/Header";
import { FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router";
import { RxCross2 } from "react-icons/rx";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../components/Utils/Loading";

export const Area: React.FC = () => {
  const { subjectId, type } = useParams();
  const axiosSecure = useAxiosSecure();
  const [areas, setAreas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  // ---------------- PAGINATION STATE ----------------
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState<number>(1);
  function handleVideoUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      alert(`Video selected: ${file.name}`);
      // You can preview or upload it here
    }
  }

  const fetchAreas = () => {
    setLoading(true);
    axiosSecure
      .get(`/subjects/${subjectId}/areas?page=${page}&limit=${limit}`)
      .then((response) => {
        setAreas(response.data.data.results);
        setTotalPages(response.data.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });
  };
  React.useEffect(() => {
    fetchAreas();
  }, [page]);

  // add Area

  // Add subject form submit handler
  function addArea(event: React.FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const area = (form.area as HTMLInputElement).value;

    axiosSecure
      .post(`/subjects/${subjectId}/area`, {
        title: area,
      })
      .then(() => {
        fetchAreas(); // Refresh
        const modal = document.getElementById(
          "my_modal_1"
        ) as HTMLDialogElement;
        modal?.close();
        form.reset();

        Swal.fire({
          icon: "success",
          title: "Area Added",
        });
      })
      .catch((error) => {
        const modal = document.getElementById(
          "my_modal_1"
        ) as HTMLDialogElement;
        modal?.close();

        Swal.fire({
          icon: "error",
          title: "Failed to add area",
          text: error.response?.data?.message || "Please try again.",
        });
      });
  }
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <Header title={"Area"}></Header>

      <div className="flex justify-between">
        <h2 className="text-2xl">Areas</h2>
        <div>
          <button
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_1"
              ) as HTMLDialogElement | null;
              if (modal) {
                modal.showModal();
              }
            }}
            className="flex gap-2 items-center justify-center bg-white p-3 hover:bg-accent rounded-xl"
          >
            <FaPlus></FaPlus> Add
          </button>
        </div>
      </div>

      <div className="space-y-3 ">
        {areas.map((area) => {
          return (
            <div>
              <Link
                to={
                  type === "FLASHCARD"
                    ? `/flashcards/${area._id}`
                    : `/all-questions/${area._id}`
                }
                key={area._id}
              >
                <div className="bg-white hover:bg-[#f3f3f3] p-3 flex justify-between items-center rounded-xl">
                  <p className="text-xl">{area.title}</p>

                  {type === "FLASHCARD" ? (
                    <Link
                      className="flex justify-center items-center gap-3 p-2 bg-accent rounded-lg"
                      to={`/flashcard/${area._id}`}
                    >
                      <FaPlus></FaPlus> Add Flashcard
                    </Link>
                  ) : (
                    <Link
                      className="flex justify-center items-center gap-3 p-2 bg-accent rounded-lg"
                      to={`/add-question/${area._id}`}
                    >
                      <FaPlus></FaPlus> Add
                    </Link>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box bg-white ">
          <form onSubmit={addArea} action="" encType="multipart/form-data">
            <h3 className="font-bold text-lg">Add Area</h3>
            <p className="py-4">
              <input
                type="text"
                className="input w-full border-1 border-slate-300 rounded-lg p-5 text-xl "
                placeholder="Add Area"
                name="area"
                list="browsers"
              />
            </p>
            <button className="btn bg-accent border-0">Save</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}

              <button className="btn border-0">
                <RxCross2 />
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_2" className="modal ">
        <div className="modal-box bg-white ">
          <h3 className="font-bold text-lg">Add tutorial content</h3>
          <p className="py-4">
            <input
              type="text"
              className="input w-full border-1 border-slate-300 rounded-lg p-5 text-lg "
              placeholder="Write tutorial title"
              list="browsers"
            />
          </p>
          <div
            className="w-full h-48 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-base-300 bg-base-200 cursor-pointer hover:bg-base-300 transition"
            onClick={() => {
              const videoInput = document.getElementById(
                "videoInput"
              ) as HTMLInputElement | null;
              if (videoInput) {
                videoInput.click();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-base-content/70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="mt-2 text-sm text-base-content/70">
              Click to upload video
            </p>

            <input
              id="videoInput"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
            />
          </div>

          <textarea
            className="textarea w-full h-24 mt-5 border-1 border-slate-300 rounded-lg p-5 text-lg "
            placeholder="Write video description"
          ></textarea>

          <div className="modal-action">
            <button className="btn bg-accent border-0">Save</button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}

              <button className="btn border-0">
                <RxCross2 />
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* ---------------- PAGINATION UI ---------------- */}

      <div className="space-y-5">
        <div className="flex justify-center items-center gap-3 ">
          {/* Prev */}
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 bg-white border rounded-lg disabled:opacity-40"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-4 py-2 border rounded-lg ${
                  page === pageNum ? "bg-accent text-white" : "bg-white"
                }`}
              >
                {pageNum}
              </button>
            )
          )}

          {/* Next */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-white border rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
