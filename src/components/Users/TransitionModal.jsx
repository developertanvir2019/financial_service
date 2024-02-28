import axios from "axios";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const TransitionModal = ({ setSidebarOpen, data }) => {
  const [transitions, setTransitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransitions = async () => {
      try {
        setLoading(true);
        // Fetch transitions based on sender or receiver number
        const response = await axios.get(
          `http://localhost:5000/api/transition/transitions?number=${data?.phone}`
        );
        setTransitions(response.data.transitions);
      } catch (error) {
        console.error("Error fetching transitions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransitions();
  }, [data?.phone]);
  console.log(transitions);
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark background overlay */}
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        className={`modalWidthBigScreen overflow-mobile fixed left-1/2 top-1/2  transform -translate-x-1/2 -translate-y-1/2 w-full md:w-[95%]  lg:w-9/12 h-full md:h-[31rem] p-4 md:p-0 bg-white  z-50 text-slate-800 `}
      >
        {/* Your sidebar content goes here */}
        <div className="sticky top-0 z-40 flex  justify-end items-start px-3  py-2">
          <button
            onClick={() => setSidebarOpen(false)}
            className="bg-red-200  px-3 text-black h-8 w-8 rounded-full flex justify-center items-center shadow-lg font-semibold"
          >
            X
          </button>
        </div>

        {/* main part */}
        {transitions?.length > 0 ? (
          <div>
            <table className="w-full overflow-scroll text-left border border-collapse rounded sm:border-separate border-slate-200">
              <tbody>
                <tr>
                  <th
                    scope="col"
                    className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                  >
                    Trx Id
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                  >
                    Sender
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                  >
                    Receiver
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                  >
                    Transition
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                  >
                    Amount
                  </th>
                </tr>
                {transitions?.map((user) => (
                  <tr key={user?._id}>
                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                      {user?.transitionId}
                    </td>
                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                      {user?.sender}
                    </td>
                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                      {user?.receiver}
                    </td>
                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                      {user?.transition}
                    </td>
                    <td className="h-12 flex justify-center gap-2 items-center px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                      {user?.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h2 className=" py-8 text-center font-semibold text-2xl">
            {loading ? "loading..." : "No Transition Found"}
          </h2>
        )}
      </div>
    </div>
  );
};

export default TransitionModal;
