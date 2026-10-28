import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useParams } from "react-router";
import Header from "../components/layout/Header";
import Swal from "sweetalert2";

export default function Content() {
  const { subjectId } = useParams();
  const axiosSecure = useAxiosSecure();

  const [contents, setContents] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Edit modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<{ id: string; title: string }>({
    id: "",
    title: "",
  });
  const [editVideoFile, setEditVideoFile] = useState<File | null>(null);
  const [editUploadProgress, setEditUploadProgress] = useState(0);
  const [editVideoUploaded, setEditVideoUploaded] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 5;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadContents();
  }, [page]);

  const loadContents = async () => {
    try {
      const res = await axiosSecure.get(
        `/tutorials?subject=${subjectId}&page=${page}&limit=${limit}`
      );
      setContents(res.data.data.results);
      setTotalPages(res.data.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await axiosSecure.delete(`/tutorials/${id}`);
      Swal.fire({ icon: "success", title: "Deleted Successfully" });
      loadContents();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err.response?.data?.message || "",
      });
    }
  };

  // OPEN EDIT MODAL
  const handleEditOpen = (item: any) => {
    setSelectedVideo(null);
    setEditVideoFile(null);
    setEditUploadProgress(0);
    setEditVideoUploaded(false);

    setEditData({ id: item._id, title: item.title });
    setEditModalOpen(true);
  };

  // HANDLE VIDEO SELECTION (just like create tutorial)
  const handleEditVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditVideoFile(file);
    setEditUploadProgress(0);
    setEditVideoUploaded(false);
  };

  // SAVE EDIT
  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editVideoFile) {
      Swal.fire({ icon: "error", title: "Please select a video file" });
      return;
    }

    const formData = new FormData();
    formData.append("title", editData.title);
    formData.append("tutorial", editVideoFile);

    try {
      await axiosSecure.patch(`/tutorials/${editData.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (p: any) => {
          const total = p.total || editVideoFile.size;
          const percent = Math.round((p.loaded * 100) / total);
          setEditUploadProgress(percent);
        },
      });

      Swal.fire({ icon: "success", title: "Tutorial Updated" });
      setEditModalOpen(false);
      setEditVideoFile(null);
      setEditUploadProgress(0);
      setEditVideoUploaded(true);
      loadContents();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || err.message,
      });
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-md">
      <Header title="Content" />

      {/* CONTENT LIST */}
      <div className="space-y-3 my-5">
        {contents.map((content) => (
          <div
            key={content._id}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center"
          >
            <h3 className="text-md font-medium text-gray-800">
              {content.title}
            </h3>

            <div className="flex items-center gap-3">
              <video
                src={content.url}
                className="w-20 h-16 cursor-pointer rounded object-cover"
                muted
                playsInline
                onClick={() => {
                  setSelectedVideo(content.url);
                  setEditModalOpen(false);
                }}
              />
              <button
                onClick={() => handleEditOpen(content)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(content._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="mt-6 flex justify-center gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-white border rounded-lg disabled:opacity-40"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-4 py-2 border rounded-lg ${
              page === num ? "bg-accent text-white" : "bg-white"
            }`}
          >
            {num}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-white border rounded-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="relative w-[60vw] h-[60vh] bg-black rounded-lg">
            <button
              className="absolute top-2 right-2 text-white text-2xl z-50"
              onClick={() => setSelectedVideo(null)}
            >
              ✕
            </button>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}

      {/* EDIT MODAL LIKE CREATE */}
      <dialog id="edit_modal" className="modal" open={editModalOpen}>
        <form onSubmit={handleEditSave}>
          <div className="modal-box bg-white w-4xl">
            <h3 className="font-bold text-lg">Edit Tutorial</h3>

            <input
              type="text"
              className="input w-full border border-slate-300 rounded-lg p-5 text-lg mt-3"
              placeholder="Write tutorial title"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />

            <div
              className={`w-full h-48 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer mt-4 relative ${
                editVideoFile ? "bg-green-100" : "bg-base-200"
              }`}
              onClick={() => document.getElementById("editVideoInput")?.click()}
            >
              {!editVideoFile && (
                <p className="text-sm">Click to upload video</p>
              )}
              {editVideoFile && (
                <p className="text-sm text-gray-700">{editVideoFile.name}</p>
              )}
              <input
                id="editVideoInput"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleEditVideoSelect}
              />

              {editUploadProgress > 0 && (
                <div className="absolute bottom-2 left-2 right-2 h-2 bg-gray-300 rounded">
                  <div
                    className="h-full bg-green-500 rounded"
                    style={{ width: `${editUploadProgress}%` }}
                  />
                </div>
              )}

              {editVideoUploaded && (
                <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg bg-black bg-opacity-50 rounded-2xl">
                  Uploaded
                </div>
              )}
            </div>

            <div className="modal-action">
              <button className="btn bg-accent border-0">Save Changes</button>
              <button
                type="button"
                className="btn border-0"
                onClick={() => setEditModalOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
}
