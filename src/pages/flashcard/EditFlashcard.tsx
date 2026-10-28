import { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useParams } from "react-router";

export default function EditFlashcard() {
  const axiosSecure = useAxiosSecure();
  const { area } = useParams();
  const [flashcard, setflashcard] = useState({}) as any;
  useEffect(() => {
    axiosSecure
      .get(`/flashcards/${area}`)
      .then((res) => setflashcard(res.data.data))
      .catch((err) => console.error(err));
  }, []);


  //   const handleAddFlashcard = (e: any) => {
  //     e.preventDefault();

  //     const form = e.target;
  //     const question = form.question.value;
  //     const answer = form.answer.value;
  //     axiosSecure
  //       .post(`/flashcards`, { area, question, answer })
  //       .then((res) => {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Flashcard added",
  //           text: "Flashcard added to this area",
  //           timer: 2000,
  //           showConfirmButton: false,
  //         });
  //       })
  //       .catch((err) =>
  //         Swal.fire({
  //           icon: "error",
  //           title: "Flashcard faild to add",
  //           text: "Something went wrong",
  //         })
  //       );
  //     form.reset();
  //   };

  const handleEditFlashcard = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const question = form.question.value;
    const answer = form.answer.value;

    axiosSecure
      .patch(`/flashcards/${flashcard._id}`, { question, answer })
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Flashcard Updated",
            text: "Flashcard updated successfully",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      })
      .catch(() =>
        Swal.fire({
          icon: "error",
          title: "Flashcard Update Faild",
          text: "Flashcard faild to updated",
          timer: 2000,
          showConfirmButton: false,
        })
      );
  };

  return (
    <>
      <Header title="Edit Flashcard"></Header>
      <div className="sm:w-[700px]  bg-white py-20 px-10">
        <form onSubmit={handleEditFlashcard} action="" className="space-y-3">
          <label className="text-lg">Question</label>
          <input
            type="text"
            name="question"
            defaultValue={flashcard?.question}
            className="w-full border-b-2 border-slate-300 p-2 focus:outline-none"
            placeholder="Write your question"
          />
          <label className="text-lg">Answer</label>
          <textarea
            name="answer"
            defaultValue={flashcard?.answer}
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
