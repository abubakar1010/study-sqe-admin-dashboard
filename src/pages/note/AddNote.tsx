import React, { useState } from "react";
import Header from "../../components/layout/Header";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useParams } from "react-router";

export default function AddNote() {
  const axiosSecure = useAxiosSecure();
  const { subjectId } = useParams() as any;
  const [title, setTitle] = useState("");

  const [file, setFile] = useState(null) as any;
  const [loading, setLoading] = useState(false);

  const handleNoteUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first");

    const formData = new FormData();
    formData.append("subject", subjectId);
    formData.append("title", title);
    formData.append("note", file);
    try {
      setLoading(true);
      await axiosSecure.post("/notes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });


      Swal.fire({
        icon: "success",
        title: "Note added",
        text: "Note added successfully to this subject",
      });

      setTitle("");

      setFile(null);
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Note upload failed",
        text: error.response.data.errorSources[0].message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="Add Note" />

      <div className="bg-white sm:w-[700px] py-10 px-10 rounded-xl shadow-md ">
        <form onSubmit={handleNoteUpload} className="space-y-5">
          <div>
            <label className="text-lg font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full focus:outline-0 border p-2 rounded-lg border-slate-300"
              placeholder="Write note title"
              required
            />
          </div>

          <div>
            <label className="text-lg font-medium">Attachment</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full border rounded-lg p-2 border-slate-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn bg-accent w-full border-0 text-white py-3 rounded-lg"
          >
            {loading ? "Uploading..." : "Save Note"}
          </button>
        </form>
      </div>
    </>
  );
}
