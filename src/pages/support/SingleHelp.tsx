import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import Header from "../../components/layout/Header";

export default function SingleHelp() {
  const axiosSecure = useAxiosSecure();
  const [support, setSupport] = useState({}) as any;
  const { supportId } = useParams();
  const [, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/supports/${supportId}`)
      .then((res) => setSupport(res?.data?.data));

    setLoading(false);
  }, []);

  const handleReply = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const reply = form.reply.value;

    try {
      axiosSecure
        .post(`/supports/${supportId}`, { description: reply })
        .then((res) => {
          if (res.data.success) {
            Swal.fire({ icon: "success", title: "Reply sent successfully" });
          }
        });
    } catch (err) {
      console.error(err);
    }
    form.reset();
  };
  return (
    <>
      <Header title="Help detail"></Header>
      <div className="sm:w-[600px] space-y-5">
        <div className=" bg-white py-20 px-10 space-y-5 rounded-lg">
          <h2 className="text-2xl font-bold">Issue Details</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="font-semibold">Issue ID :</p>
              <p>{support?._id}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Date :</p>
              <p>{new Date(support?.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">User Name :</p>
              <p>{support?.user?.username}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Email :</p>
              <p>{support?.user?.email}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Phone Number :</p>
              <p>
                {support?.user?.phoneNumber
                  ? support?.user?.phoneNumber
                  : "Phone number not added yet"}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Description of issue</h3>
            <p>{support.description}</p>
          </div>
        </div>

        {/* Reply  */}

        {support?.status === "RESOLVED" ? (
          ""
        ) : (
          <div className="bg-white rounded-lg p-10">
            <form onSubmit={handleReply} action="">
              <textarea
                placeholder="Write reply to this query..."
                className="w-full border border-slate-400 rounded-lg h-[100px] p-5 focus:outline-none focus:border-slate-400 focus:ring-0"
                name="reply"
              ></textarea>
              <button
                className="btn w-full bg-accent text-white border-none rounded-lg"
                name="submit"
              >
                Reply
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
