import { useEffect, useState } from "react";


import { RxCross2 } from "react-icons/rx";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Header from "../components/layout/Header";

export default function AllUsers() {
  const axiosSecure = useAxiosSecure();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  //  Modal State
  const [selectedUser, setSelectedUser] = useState(null) as any;
  const [userLoading, setUserLoading] = useState(false);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(
        `/users?search=${search}&page=${page}&limit=${limit}`
      );

      setUsers(res.data.data.results);
      setTotalResults(res.data.data.totalResults);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  const totalPages = Math.ceil(totalResults / limit);

  // Fetch Single User + Open Modal
  const handleViewProfile = async (id: any) => {
    try {
      setUserLoading(true);
      const res = await axiosSecure.get(`/users/${id}`);
      setSelectedUser(res.data.data);

      const modal = document.getElementById("user_modal") as HTMLDialogElement;
      modal?.showModal();
    } catch (error) {
      console.error("Failed to fetch user", error);
    } finally {
      setUserLoading(false);
    }
  };

  return (
    <>
      <Header title="All Users" />

      <div>
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <h2 className="p-5 text-2xl">All Users ({totalResults})</h2>

          <div className="join">
            <label className="input rounded-bl-full rounded-full join-item bg-white w-[300px]">
              <input
                type="text"
                placeholder="search by user name or email"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </label>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center py-10">Loading users...</p>
          ) : (
            <table className="table table-md">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Verified</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td className="text-center py-10">No users found</td>
                  </tr>
                ) : (
                  users.map((user: any, index) => (
                    <tr key={user._id}>
                      <th>{(page - 1) * limit + index + 1}</th>
                      <td>{user.username || "N/A"}</td>
                      <td>{user.email}</td>
                      <td>{user.address || "N/A"}</td>
                      <td>
                        {user.isVerified ? (
                          <span className="badge badge-success">Verified</span>
                        ) : (
                          <span className="badge badge-error">Unverified</span>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => handleViewProfile(user._id)}
                          className="bg-accent py-1 px-5 rounded-xl text-white hover:bg-[#977275]"
                        >
                          View profile
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="space-y-5">
            <div className="flex justify-center items-center gap-3">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className="px-4 py-2 bg-white border rounded-lg disabled:opacity-40"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-4 py-2 border rounded-lg ${
                      page === pageNum ? "bg-accent text-white" : "bg-white"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}

              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 bg-white border rounded-lg disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/*  USER DETAILS MODAL */}
      <dialog id="user_modal" className="modal">
        <div className="modal-box bg-white p-10 rounded-lg">
          <div className="modal-action">
            <form method="dialog">
              <button className="btn border-0">
                <RxCross2 />
              </button>
            </form>
          </div>
          {userLoading ? (
            <p className="text-center py-10">Loading user...</p>
          ) : selectedUser ? (
            <>
              <h3 className="text-xl font-bold mb-4">User Details</h3>

              <div className="gap-4">
                <div className="space-y-2 text-center">
                  <p className="flex items-center justify-between">
                    <strong>Username:</strong> <p>{selectedUser.username}</p>
                  </p>
                  <p className="flex items-center justify-between">
                    <strong>Email:</strong> <p>{selectedUser.email}</p>
                  </p>
                  <p className="flex items-center justify-between">
                    <strong>Phone:</strong>{" "}
                    <p>{selectedUser.phoneNumber || "N/A"}</p>
                  </p>
                  <p className="flex items-center justify-between">
                    <strong>Address:</strong>{" "}
                    <p>{selectedUser.address || "N/A"}</p>
                  </p>
                  <p className="flex items-center justify-between">
                    <strong>Verified:</strong>{" "}
                    <p>{selectedUser.isVerified ? "Yes " : "No "}</p>
                  </p>
                  <p className="flex items-center justify-between">
                    <strong>Subscription:</strong>{" "}
                    <p>
                      {selectedUser.hasSubscription ? "Active" : "Inactive"}
                    </p>
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </dialog>
    </>
  );
}
