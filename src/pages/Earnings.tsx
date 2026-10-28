import React from "react";
import Header from "../components/layout/Header";
import { RiErrorWarningLine } from "react-icons/ri";

export const Earnings: React.FC = () => {
  return (
    <>
      <div>
        <Header title="Earnings"></Header>
      </div>

      <div className="flex sm:flex-row flex-col justify-center space-y-5">
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead>
            <tr>
              <th>Tx.Id</th>
              <th>User Name</th>
              <th>Subscription</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>3h4i2ju23</th>
              <td>Yancy Tear</td>
              <td>Standerd</td>
              <td>520</td>
              <td>10/05/2025</td>
              <td>
                {" "}
                <button className="bg-accent  p-3 rounded-full text-white hover:bg-[#977275]">
                  <RiErrorWarningLine size={20} />
                </button>
              </td>
            </tr>
            <tr>
              <th>3h4i2ju23</th>
              <td>Yancy Tear</td>
              <td>Standerd</td>
              <td>520</td>
              <td>10/05/2025</td>
              <td>
                {" "}
                <button className="bg-accent  p-3 rounded-full text-white hover:bg-[#977275]">
                  <RiErrorWarningLine size={20} />
                </button>
              </td>
            </tr>
            <tr>
              <th>3h4i2ju23</th>
              <td>Yancy Tear</td>
              <td>Standerd</td>
              <td>520</td>
              <td>10/05/2025</td>
              <td>
                {" "}
                <button className="bg-accent  p-3 rounded-full text-white hover:bg-[#977275]">
                  <RiErrorWarningLine size={20} />
                </button>
              </td>
            </tr>
            <tr>
              <th>3h4i2ju23</th>
              <td>Yancy Tear</td>
              <td>Standerd</td>
              <td>520</td>
              <td>10/05/2025</td>
              <td>
                {" "}
                <button className="bg-accent  p-3 rounded-full text-white hover:bg-[#977275]">
                  <RiErrorWarningLine size={20} />
                </button>
              </td>
            </tr>
            <tr>
              <th>3h4i2ju23</th>
              <td>Yancy Tear</td>
              <td>Standerd</td>
              <td>520</td>
              <td>10/05/2025</td>
              <td>
                {" "}
                <button className="bg-accent  p-3 rounded-full text-white hover:bg-[#977275]">
                  <RiErrorWarningLine size={20} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Table */}
    </>
  );
};
