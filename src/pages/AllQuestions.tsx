import { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { Link, useParams } from "react-router";
import Header from "../components/layout/Header";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function AllQuestions() {
  const { areaId } = useParams();

  const axiosSecure = useAxiosSecure();

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!areaId) return;

    setLoading(true);

    axiosSecure
      .get(`/questions?area=${areaId}`)
      .then((res) => {
        setQuestions(res.data.data.results); // adjust if your backend wraps data differently
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [areaId]);

  return (
    <>
      <Header title="All Questions" />

      <div className="mt-5 space-y-5">
        {/* Loading State */}
        {loading && <p className="text-center">Loading...</p>}

        {/* No Data */}
        {!loading && questions.length === 0 && (
          <p className="text-center text-gray-500">No questions found.</p>
        )}

        {/* Questions List */}
        {questions.map((q: any) => (
          <Link key={q._id} to={`/single-question/${q._id}`}>
            <div className="p-5 bg-white rounded-2xl flex justify-between items-center mb-3">
              <p className="text-lg">{q.title}</p>
              <MdArrowForwardIos />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
