import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useParams } from "react-router";

export default function EditNote() {
  const axiosSecure = useAxiosSecure();
  const { noteId } = useParams() as any;

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [existingFile, setExistingFile] = useState("");
  const [loading, setLoading] = useState(false);

  // -------- Fetch the note --------
  const fetchNote = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(`/notes/${noteId}`);
      const data = res.data.data;

      setTitle(data.title);
      setExistingFile(data.note);

      setLoading(false);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Failed to load note",
        text: error.response?.data?.message || "Something went wrong.",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  // -------- Update Note --------
  const handleNoteEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);

    // Only append file if updated
    if (file) {
      formData.append("note", file);
    }

    try {
      setLoading(true);

      await axiosSecure.patch(`/notes/${noteId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Note updated",
        text: "Note updated successfully",
      });

      // Update UI after patch
      //   if (file) {
      //     setExistingFile(res.data.data.note);
      //   }

      //   setFile(null);
      //   setLoading(false);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text:
          error.response?.data?.errorSources?.[0]?.message ||
          "Couldn't update note",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="Edit Note" />

      <div className="bg-white sm:w-[700px] py-10 px-10 rounded-xl shadow-md">
        <form onSubmit={handleNoteEdit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="text-lg font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full focus:outline-0 border p-2 rounded-lg border-slate-300"
              required
            />
          </div>

          {/* Existing PDF preview */}
          {existingFile && (
            <div>
              <label className="text-lg font-medium">Current Document</label>
              <iframe
                src={existingFile}
                className="w-full h-[300px] border rounded-lg mt-2"
              />
            </div>
          )}

          {/* Upload new file (optional) */}
          <div>
            <label className="text-lg font-medium">Replace Attachment</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full border rounded-lg p-2 border-slate-300"
            />
            <small className="text-slate-500">
              Leave empty to keep the existing file
            </small>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn bg-accent w-full border-0 text-white py-3 rounded-lg"
          >
            {loading ? "Updating..." : "Update Note"}
          </button>
        </form>
      </div>
    </>
  );
}
