import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Header from "../Shared/Header";

const UserTransitions = () => {
  const [phone, setPhone] = useState(null);
  const [transitions, setTransitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setPhone(decodedToken.phone);
    }
  }, []);

  useEffect(() => {
    const fetchTransitions = async () => {
      try {
        setLoading(true);
        if (phone) {
          // Fetch transitions based on sender or receiver number
          const response = await axios.get(
            `http://localhost:5000/api/transition/transitions?number=${phone}`
          );
          setTransitions(response.data.transitions);
        }
      } catch (error) {
        console.error("Error fetching transitions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransitions();
  }, [phone]);
  return (
    <>
      <Header />
      <div>
        {" "}
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
    </>
  );
};

export default UserTransitions;
