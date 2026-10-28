import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import { FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export const Notes: React.FC = () => {
  const { subjectId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [notes, setNotes] = useState([]);
  const fetchNotes = () => {
    axiosSecure
      .get(`/notes?subject=${subjectId}`)
      .then((res) => {
        setNotes(res.data.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  const handleDeleteNote = (id: any) => {
    axiosSecure.delete(`/notes/${id}`).then(() => {
      Swal.fire({
        icon: "success",
        title: "Note Deleted",
        text: "Note deleted successfully",
      });
    });
    fetchNotes();
  };
  return (
    <div className="space-y-3">
      <Header title="Notes"></Header>

      <div className="flex justify-between pt-5">
        <h2 className="text-2xl">Notes</h2>
        <div>
          <Link
            to={`/notes/add-note/${subjectId}`}
            className="flex gap-2 items-center justify-center bg-white p-3 hover:bg-accent rounded-xl"
          >
            <FaPlus></FaPlus> Add
          </Link>
        </div>
      </div>

      {/* Questions */}

      <div className="space-y-5 ">
        {notes.map((note: any) => (
          <div>
            <Link to={`/single-note/${note._id}`}>
              <div className="p-5 bg-white rounded-2xl flex items-center justify-between">
                <p>{note.title}</p>
                <div className="flex items-center gap-3">
                  <Link
                    className="bg-accent text-white rounded-lg border-0 px-5 py-2"
                    to={`/notes/edit-note/${note._id}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteNote(note._id);
                    }}
                    className="bg-[#AD1E25] text-white rounded-lg border-0 px-5 py-2"
                  >
                    Delete
                  </button>
                  <iframe
                    src={note.url}
                    className="w-[50px] h-[50px] border rounded-lg"
                  ></iframe>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {/* Questions */}
    </div>
  );
};
