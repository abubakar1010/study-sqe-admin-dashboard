import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

export const Help: React.FC = () => {
  const axiosSecure = useAxiosSecure();
  const [supports, setSupports] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/supports")
      .then((res) => setSupports(res?.data?.data?.results || []))
      .catch((err) => console.error("Error loading supports:", err));
  }, []);

  return (
    <>
      <Header title="Help Center" />

      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead>
            <tr>
              <th>Issue Id</th>
              <th>User Name</th>
              <th>Subscription</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {supports.map((support: any) => (
              <tr key={support?._id}>
                <th>{support?._id}</th>
                <td>{support?.user?.username || "N/A"}</td>
                <td>{support?.hasSubscription ? "Yes" : "No"}</td>
                <td>{support?.status}</td>
                <td>
                  {support?.createdAt
                    ? new Date(support.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <Link
                    to={`/help/${support?._id}`}
                    className="btn w-[100px] bg-accent border-0 py-5 px-2 rounded-full text-white hover:bg-[#977275]"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
