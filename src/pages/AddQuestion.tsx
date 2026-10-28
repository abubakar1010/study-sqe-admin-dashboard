import React, { useState } from "react";
import { useParams } from "react-router";
import Header from "../components/layout/Header";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function AddQuestion() {
  const { areaId } = useParams(); // URL: /questions/:areaId
  const axiosSecure = useAxiosSecure();

  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [options, setOptions] = useState(["", "", "", "", ""]);
  const [rightOption, setRightOption] = useState(0);
  const [solution, setSolution] = useState("");

  const handleOptionChange = (value: string, index: number) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axiosSecure
      .post("/questions", {
        area: areaId,
        title,
        difficulty,
        options,
        rightOption,
        solution,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Question Added",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: error.response?.data?.message || "",
        });
      });
  };

  return (
    <>
      <Header title="Add Question" />

      <div className="p-5 bg-white rounded-xl mt-5 space-y-5">
        <h2 className="text-2xl font-semibold">Create Question</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Question Title */}
          <div>
            <label className="font-semibold">Question</label>
            <input
              type="text"
              className=" w-full border border-gray-300 rounded-lg p-3 "
              placeholder="Write your question"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="font-semibold">Difficulty</label>
            <select
              className=" w-full border border-gray-300 rounded-lg p-3"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HARD">HARD</option>
            </select>
          </div>

          {/* Options */}
          <div>
            <label className="font-semibold">Options (5 total)</label>
            <div className="space-y-2 mt-2">
              {options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  className=" w-full border border-gray-300 rounded-lg p-3"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(e.target.value, i)}
                />
              ))}
            </div>
          </div>

          {/* Right Option */}
          <div>
            <label className="font-semibold">Correct Option</label>
            <select
              className=" w-full border border-gray-300 rounded-lg p-3 "
              value={rightOption}
              onChange={(e) => setRightOption(Number(e.target.value))}
            >
              <option value={0}>Option 1</option>
              <option value={1}>Option 2</option>
              <option value={2}>Option 3</option>
              <option value={3}>Option 4</option>
              <option value={4}>Option 5</option>
            </select>
          </div>

          {/* Solution */}
          <div>
            <label className="font-semibold">Solution</label>
            <textarea
              className="textarea w-full border border-gray-300 rounded-lg p-3 "
              placeholder="Write the solution"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button className="btn bg-accent text-white w-full p-3 rounded-lg">
            Save Question
          </button>
        </form>
      </div>
    </>
  );
}
