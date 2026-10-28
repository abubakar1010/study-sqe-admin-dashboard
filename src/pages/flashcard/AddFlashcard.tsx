import Header from "../../components/layout/Header";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useParams } from "react-router";

export default function AddFlashcard() {
  const axiosSecure = useAxiosSecure();
  const { area } = useParams();
  const handleAddFlashcard = (e: any) => {
    e.preventDefault();

    const form = e.target;
    const question = form.question.value;
    const answer = form.answer.value;
    axiosSecure
      .post(`/flashcards`, { area, question, answer })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Flashcard added",
          text: "Flashcard added to this area",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Flashcard faild to add",
          text: "Something went wrong",
        })
      );
    form.reset();
  };
  return (
    <>
      <Header title="Add Flashcard"></Header>
      <div className="sm:w-[700px]  bg-white py-20 px-10">
        <form action="" onSubmit={handleAddFlashcard} className="space-y-3">
          <label className="text-lg">Question</label>
          <input
            type="text"
            name="question"
            className="w-full border-b-2 border-slate-300 p-2 focus:outline-none"
            placeholder="Write your question"
          />
          <label className="text-lg">Answer</label>
          <textarea
            name="answer"
            placeholder="Write your answer"
            className=" w-full h-[100px] p-2 border-b-2 border-slate-300 focus:outline-none"
          ></textarea>
          <button
            type="submit"
            className="btn w-full bg-accent text-white border-node"
          >
            Save Flashcard
          </button>
        </form>
      </div>
    </>
  );
}
