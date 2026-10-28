import Header from "../components/layout/Header";
import Rechart from "../components/Utils/Rechart";
export default function Dashboard() {
  return (
    <>
      <Header title="Overview"></Header>

      <div className="flex sm:flex-row flex-col gap-5 justify-center space-y-5">
        <div className="dashboard-card">
          <h3 className="text-2xl ">Total Earning</h3>
          <p className="text-2xl font-semibold">24234$</p>
        </div>
        <div className="dashboard-card">
          <h3 className="text-2xl ">Total Users</h3>
          <p className="text-2xl font-semibold">625</p>
        </div>
        <div className="dashboard-card">
          <h3 className="text-2xl ">Total Subscriber</h3>
          <p className="text-2xl font-semibold">705</p>
        </div>
      </div>

      {/* Rechart */}
      <div className="w-full h-[500px]">
        <Rechart></Rechart>
      </div>
      {/* Rechart */}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead>
            <tr>
              <th>Id</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>State</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>test</td>
              <td>
                {" "}
                <button className="bg-accent py-1 px-5 rounded-xl text-white hover:bg-[#977275]">
                  View profile
                </button>
              </td>
            </tr>
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Zemlak, Daniel and Leannon</td>
              <td>test</td>
              <td>
                {" "}
                <button className="bg-accent py-1 px-5 rounded-xl text-white hover:bg-[#977275]">
                  View profile
                </button>
              </td>
            </tr>
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Carroll Group</td>
              <td>test</td>
              <td>
                {" "}
                <button className="bg-accent py-1 px-5 rounded-xl text-white hover:bg-[#977275]">
                  View profile
                </button>
              </td>
            </tr>
            <tr>
              <th>4</th>
              <td>Marjy Ferencz</td>
              <td>Office Assistant I</td>
              <td>Rowe-Schoen</td>
              <td>test</td>
              <td>
                {" "}
                <button className="bg-accent py-1 px-5 rounded-xl text-white hover:bg-[#977275]">
                  View profile
                </button>
              </td>
            </tr>
            <tr>
              <th>5</th>
              <td>Yancy Tear</td>
              <td>Community Outreach Specialist</td>
              <td>Wyman-Ledner</td>
              <td>test</td>
              <td>
                {" "}
                <button className="bg-accent py-1 px-5 rounded-xl text-white hover:bg-[#977275]">
                  View profile
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Table */}
    </>
  );
}
