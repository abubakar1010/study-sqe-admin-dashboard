import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
import Loading from "../components/Utils/Loading";

export default function Tutorials() {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [subjects, setSubjects] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState<number>(1);

  // ------------------- VIDEO UPLOAD STATE -------------------
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [videoUploaded, setVideoUploaded] = useState(false);

  // ------------------- FETCH SUBJECTS -------------------
  const fetchSubjects = () => {
    setLoading(true);
    axiosSecure
      .get(`/subjects?type=TUTORIAL&page=${page}&limit=${limit}`)
      .then((response) => {
        setSubjects(response.data.data.results);
        setTotalPages(response.data.data.totalPages);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching subjects:", error));
  };

  useEffect(() => {
    fetchSubjects();
  }, [page]);

  // ------------------- HANDLE VIDEO SELECTION -------------------
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoUploaded(false);
      setUploadProgress(0);
    }
  };

  // ------------------- ADD TUTORIAL -------------------
  const addTutorial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const title = (form.querySelector("[name='title']") as HTMLInputElement)
      .value;
    const subjectId = (
      form.querySelector("[name='subjectId']") as HTMLInputElement
    ).value;

    if (!videoFile) {
      Swal.fire({ icon: "error", title: "Upload a video" });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subjectId);
    formData.append("tutorial", videoFile);

    try {
      await axiosSecure.post(`/tutorials`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress(percent);
        },
      });

      setVideoUploaded(true); // show video posted
      setVideoFile(null);
      setUploadProgress(0);
      const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
      modal?.close();
      form.reset();

      Swal.fire({ icon: "success", title: "Tutorial Added" });
    } catch (error: any) {
      const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
      modal?.close();

      Swal.fire({
        icon: "error",
        title: "Failed to add tutorial",
        text: error.response?.data?.message || "Please try again.",
      });
    }
  };

  // ------------------- ADD SUBJECT -------------------
  const addsubject = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const subject = (form.subject as HTMLInputElement).value;

    axiosSecure
      .post("/subjects", { title: subject, type: "TUTORIAL" })
      .then(() => {
        fetchSubjects();
        const modal = document.getElementById(
          "my_modal_1"
        ) as HTMLDialogElement;
        modal?.close();
        form.reset();
        Swal.fire({ icon: "success", title: "Subject Added" });
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
  };
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <Header title="Subject" />
      <div className="flex justify-between">
        <h2 className="text-2xl">Subject</h2>
        <div>
          {/* <button
            onClick={() => {
              const modal = document.getElementById(
                "my_modal_1"
              ) as HTMLDialogElement;
              modal?.showModal();
            }}
            className="flex gap-2 items-center justify-center bg-white p-3 hover:bg-accent rounded-xl"
          >
            <FaPlus /> Add
          </button> */}
        </div>
      </div>

      <div className="space-y-3">
        {subjects.map((subject: any) => (
          <div className="space-y-3" key={subject._id}>
            <Link to={`/content/${subject._id}`}>
              <div className="bg-white hover:bg-[#f3f3f3] p-3 flex justify-between items-center rounded-xl">
                <p className="text-xl">{subject.title}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSubjectId(subject._id);
                    const modal = document.getElementById(
                      "my_modal_2"
                    ) as HTMLDialogElement;
                    modal?.showModal();
                  }}
                  className="flex gap-2 items-center justify-center bg-accent p-3 hover:bg-white hover:shadow-md rounded-xl"
                >
                  <FaPlus /> Add
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* ---------------- PAGINATION UI ---------------- */}
      <div className="space-y-5">
        <div className="flex justify-center items-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 bg-white border rounded-lg disabled:opacity-40"
          >
            Prev
          </button>

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

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-white border rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* ---------------- MODALS ---------------- */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white">
          <form onSubmit={addsubject} className="space-y-5">
            <h3 className="font-bold text-lg">Add Subject</h3>
            <input
              type="text"
              name="subject"
              className="input w-full border-1 border-slate-300 rounded-lg p-5 text-xl"
              placeholder="Write tutorial title"
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

      <dialog id="my_modal_2" className="modal">
        <form onSubmit={addTutorial}>
          <div className="modal-box bg-white w-4xl">
            <h3 className="font-bold text-lg">Add Tutorial</h3>
            <input type="hidden" name="subjectId" value={selectedSubjectId} />
            <input
              type="text"
              className="input w-full border-1 border-slate-300 rounded-lg p-5 text-lg"
              name="title"
              placeholder="Write tutorial title"
            />

            <div
              className={`w-full h-48 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer mt-4 relative ${
                videoFile ? "bg-green-100" : "bg-base-200"
              }`}
              onClick={() => document.getElementById("videoInput")?.click()}
            >
              {!videoFile && <p className="text-sm">Click to upload video</p>}
              {videoFile && (
                <p className="text-sm text-gray-700">{videoFile.name}</p>
              )}
              <input
                id="videoInput"
                type="file"
                accept="video/*"
                name="tutorial"
                className="hidden"
                onChange={handleVideoUpload}
              />

              {/* Progress bar */}
              {uploadProgress > 0 && (
                <div className="absolute bottom-2 left-2 right-2 h-2 bg-gray-300 rounded">
                  <div
                    className="h-full bg-green-500 rounded"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}

              {/* Uploaded label */}
              {videoUploaded && (
                <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg bg-black bg-opacity-50 rounded-2xl">
                  Uploaded
                </div>
              )}
            </div>

            <div className="modal-action">
              <button className="btn bg-accent border-0">Save</button>
              <form method="dialog">
                <button className="btn border-0">
                  <RxCross2 />
                </button>
              </form>
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
}
