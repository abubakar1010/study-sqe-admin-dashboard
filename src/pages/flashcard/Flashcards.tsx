import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import { FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Utils/Loading";
import Swal from "sweetalert2";

export const Flashcards: React.FC = () => {
  const { area } = useParams();
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);

  const axiosSecure = useAxiosSecure();

  type Flashcard = {
    _id: string;
    question: string;
    answer: string;
  };

  // ---------------- PAGINATION STATE ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchFlashcards = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(
        `/flashcards?area=${area}&page=${page}&limit=${limit}`
      );

      setFlashcards(res.data.data.results);
      setTotalPages(res.data.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashcards(currentPage);
  }, [currentPage]);

  // Delete flashcard

  const deleteFlashcard = (id: string) => {
    axiosSecure
      .delete(`/flashcards/${id}`)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Flashcard deleted",
          text: "Flashcard deleted successfully",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchFlashcards(currentPage);
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Flashcard delete faild",
          text: "Faild to delete flashcard",
          timer: 2000,
          showConfirmButton: false,
        })
      );
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-3">
      <Header title="Flashcards" />

      <div className="flex justify-between pt-5">
        <h2 className="text-2xl">Flashcards</h2>

        <Link
          to={`/flashcard/${area}`}
          className="flex gap-2 items-center justify-center bg-white p-3 hover:bg-accent rounded-xl"
        >
          <FaPlus /> Add
        </Link>
      </div>

      <div className="space-y-5">
        {flashcards.map((flashcard: Flashcard) => (
          <div>
            <div
              key={flashcard._id}
              className="p-5 bg-white rounded-2xl flex justify-between"
            >
              <p>{flashcard.question}</p>
              <div className="flex items-center gap-5">
                <Link
                  to={`/edit-flashcard/${flashcard._id}`}
                  className="btn bg-accent text-white border-none rounded-lg"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteFlashcard(flashcard._id)}
                  className="btn bg-[#AD1E25] text-white border-none rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {flashcards.length === 0 && (
          <p className="text-center text-slate-500 py-10">
            No flashcards found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="space-y-5">
        <div className="flex justify-center items-center gap-3">
          {/* Prev */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-white border rounded-lg disabled:opacity-40"
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === pageNum ? "bg-accent text-white" : "bg-white"
                }`}
              >
                {pageNum}
              </button>
            )
          )}

          {/* Next */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-white border rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
