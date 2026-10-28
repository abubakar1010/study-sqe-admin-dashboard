import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function Faq() {
  const axiosSecure = useAxiosSecure();

  const [faqs, setFaqs] = useState<
    { _id: string; question: string; answer: string }[]
  >([]);

  const [newQuestion, setNewQuestion] = useState<string>("");
  const [newAnswer, setNewAnswer] = useState<string>("");

  const [editId, setEditId] = useState<string | null>(null);
  const [editQuestion, setEditQuestion] = useState<string>("");
  const [editAnswer, setEditAnswer] = useState<string>("");

  // Fetch FAQs
  const fetchFaqs = async () => {
    const res = await axiosSecure.get("/faqs");
    setFaqs(res.data.data);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  // Add FAQ
  const handleAddFaq = async (e: any) => {
    e.preventDefault();

    try {
      await axiosSecure.post("/faqs", {
        question: newQuestion,
        answer: newAnswer,
      });

      Swal.fire({
        icon: "success",
        title: "FAQ Added!",
        text: "Your FAQ has been added successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      setNewQuestion("");
      setNewAnswer("");
      fetchFaqs();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add FAQ",
        text: "Something went wrong. Try again.",
      });
    }
  };

  // Delete FAQ
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This FAQ will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/faqs/${id}`);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "FAQ deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        fetchFaqs();
      }
    });
  };

  // Start editing
  const startEdit = (faq: any) => {
    setEditId(faq._id);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
  };

  // Save Edit
  const saveEdit = async (id: any) => {
    try {
      await axiosSecure.patch(`/faqs/${id}`, {
        question: editQuestion,
        answer: editAnswer,
      });

      Swal.fire({
        icon: "success",
        title: "FAQ Updated!",
        text: "Changes saved successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

      setEditId(null);
      fetchFaqs();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Could not update FAQ. Try again.",
      });
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">FAQ Management</h1>

      {/* Add FAQ Form */}
      <form
        onSubmit={handleAddFaq}
        className="bg-white p-5 rounded-xl shadow mb-10 space-y-4"
      >
        <h2 className="text-xl font-semibold">Add New FAQ</h2>

        <input
          type="text"
          className="input w-full border p-2"
          placeholder="FAQ Question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          required
        />

        <textarea
          className="textarea w-full border p-2"
          placeholder="FAQ Answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          required
        ></textarea>

        <button className="btn bg-accent text-white w-full">Add FAQ</button>
      </form>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs?.map((faq, index) => (
          <div
            key={faq._id}
            className="bg-white p-5 rounded-xl shadow flex flex-col gap-3"
          >
            <p className="text-lg font-bold">{index + 1} FAQ</p>

            {editId === faq._id ? (
              <>
                <input
                  className="input border w-full p-2"
                  value={editQuestion}
                  onChange={(e) => setEditQuestion(e.target.value)}
                />

                <textarea
                  className="textarea border w-full p-2"
                  value={editAnswer}
                  onChange={(e) => setEditAnswer(e.target.value)}
                ></textarea>

                <button
                  className="btn bg-accent text-white"
                  onClick={() => saveEdit(faq._id)}
                >
                  <FaSave /> Save
                </button>
              </>
            ) : (
              <>
                <p className="text-lg">
                  <strong>Question:</strong> {faq.question}
                </p>
                <p className="text-lg">
                  <strong>Answer:</strong> {faq.answer}
                </p>

                <div className="flex gap-3 pt-3">
                  <button
                    className="btn bg-accent text-white"
                    onClick={() => startEdit(faq)}
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    className="btn bg-[#AD1E25] text-white"
                    onClick={() => handleDelete(faq._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
