import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../components/layout/Header";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function UpdateQuestion() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [options, setOptions] = useState<string[]>(["", "", "", "", ""]);
  const [rightOption, setRightOption] = useState(0);
  const [solution, setSolution] = useState("");

  // -------------------- HELPERS --------------------
  const arrayToObject = (arr: string[]) => {
    const obj: Record<string, string> = {};
    arr.forEach((v, i) => {
      if (v.trim()) obj[i] = v;
    });
    return obj;
  };

  const handleOptionChange = (value: string, index: number) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  // -------------------- GET QUESTION --------------------
  const fetchQuestion = async () => {
    try {
      const { data } = await axiosSecure.get(`/questions/${id}`);
      const q = data.data;

      setTitle(q.title || "");
      setDifficulty(q.difficulty || "EASY");

      // convert backend object → array
      const arr = ["", "", "", "", ""];
      Object.keys(q.options || {}).forEach((k) => {
        arr[Number(k)] = q.options[k];
      });
      setOptions(arr);

      setRightOption(q.rightOption ?? 0);
      setSolution(q.solution || "");

      setLoading(false);
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  // -------------------- UPDATE QUESTION --------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axiosSecure.patch(`/questions/${id}`, {
        title,
        difficulty,
        options: arrayToObject(options),
        rightOption,
        solution,
      });

      Swal.fire({
        icon: "success",
        title: "Question Updated",
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || "",
      });
    }
  };

  // -------------------- LOADING --------------------
  if (loading) {
    return (
      <div className="p-10 text-center text-xl font-semibold">
        Loading question...
      </div>
    );
  }

  // -------------------- UI --------------------
  return (
    <>
      <Header title="Update Question" />

      <div className="p-5 bg-white rounded-xl mt-5 space-y-5">
        <h2 className="text-2xl font-semibold">Edit Question</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-semibold">Question</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Difficulty</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HARD">HARD</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Options (5)</label>
            <div className="space-y-2 mt-2">
              {options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(e.target.value, i)}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold">Correct Option</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3"
              value={rightOption}
              onChange={(e) => setRightOption(Number(e.target.value))}
            >
              {[0, 1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  Option {num + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold">Solution</label>
            <textarea
              className="textarea w-full border border-gray-300 rounded-lg p-3"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            />
          </div>

          <button className="btn bg-accent text-white w-full p-3 rounded-lg">
            Update Question
          </button>
        </form>
      </div>
    </>
  );
}
