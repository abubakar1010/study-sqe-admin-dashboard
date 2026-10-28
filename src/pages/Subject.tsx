import * as React from "react";
import { useState } from "react";
import Header from "../components/layout/Header";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router";
import { RxCross2 } from "react-icons/rx";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../components/Utils/Loading";

export const Subject: React.FC = () => {
  const { assessment, type } = useParams();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [, setSelectedSubjectId] = useState<string>("");
  const [subjects, setSubjects] = useState<any[]>([]);
  // ---------------- PAGINATION STATE ----------------
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState<number>(1);
  const fetchSubjects = () => {
    setLoading(true);
    axiosSecure
      .get(
        `/subjects?assessment=${assessment}&type=${type}&page=${page}&limit=${limit}`
      )
      .then((response) => {
        setSubjects(response.data.data.results);
        setTotalPages(response.data.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });
  };
  React.useEffect(() => {
    fetchSubjects();
  }, [page, assessment]);

  if (loading) {
    return <Loading></Loading>;
  }
  function addsubject(event: React.FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const subjectTitle = (form.subjectTitle as HTMLInputElement).value;

    axiosSecure
      .post("/subjects", {
        assessment: assessment,
        title: subjectTitle,
        type: type,
      })
      .then(() => {
        fetchSubjects(); // Refresh
        const modal = document.getElementById(
          "my_modal_1"
        ) as HTMLDialogElement;
        modal?.close();
        form.reset();

        Swal.fire({
          icon: "success",
          title: "Subject Added",
        });
      })
      .catch((error) => {
        const modal = document.getElementById(
          "my_modal_1"
        ) as HTMLDialogElement;
        modal?.close();

        Swal.fire({
          icon: "error",
          title: "Failed to add subject",
          text: error.response?.data?.message || "Please try again.",
        });
      });
  }

  return (
    <>
      <div className="space-y-3">
        <Header title="Questions"></Header>

        <div className="flex justify-between pt-5">
          <h2 className="text-2xl">Subjects</h2>
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

        {/* Questions */}

        <div className="space-y-5">
          {subjects.map((subject: any) => (
            <Link
              key={subject._id}
              to={
                type === "NOTE"
                  ? `/notes/${subject._id}`
                  : `/area/${type}/${subject._id}`
              }
            >
              <div className="bg-white hover:bg-[#f3f3f3] p-3 flex justify-between items-center rounded-xl mb-3 ">
                <p className="text-xl">{subject.title}</p>
                <button
                  onClick={() => {
                    setSelectedSubjectId(subject._id);
                    const modal = document.getElementById(
                      "my_modal_2"
                    ) as HTMLDialogElement;
                    modal?.showModal();
                  }}
                  className="flex gap-2 items-center justify-center bg-accent p-3 hover:bg-white hover:shadow-md rounded-xl"
                >
                  <FaArrowRight />
                </button>
              </div>
            </Link>
          ))}
        </div>
        {/* Questions */}
      </div>
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

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white">
          <form onSubmit={addsubject} className="space-y-5">
            <h3 className="font-bold text-lg">Add Subject</h3>
            <input
              type="text"
              name="subjectTitle"
              className="input w-full border-1 border-slate-300 rounded-lg p-5 text-xl"
              placeholder="Add Subject title"
            />

            <button type="submit" className="btn bg-accent border-0">
              Save
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn border-0">
                <RxCross2 />
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
