import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import TransitionModal from "./TransitionModal";

/* eslint-disable react/prop-types */
const User = ({ user, setRerender }) => {
  // agent approved
  const [loading, setLoading] = useState(false);

  const handleApproveUser = async (userId) => {
    try {
      setLoading(true);

      // Make PUT request to approve user
      const response = await axios.put(
        `http://localhost:5000/api/user/approve/${userId}`
      );

      if (response.data.message) {
        setRerender(response.data.message);
        Swal.fire("Congratulations!!!", "Agent Is approved", "success");
      }
    } catch (error) {
      // If an error occurs, set error message
      Swal.fire("Failed", "To approved agent", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleBlockUser = async (userId) => {
    try {
      setLoading(true);

      // Make PUT request to approve user
      const response = await axios.put(
        `http://localhost:5000/api/user/block/${userId}`
      );

      if (response.data.message) {
        setRerender(response.data.message);
        Swal.fire("Congratulations!!!", "user block success", "success");
      }
    } catch (error) {
      // If an error occurs, set error message
      Swal.fire("Failed", "To block user", "error");
    } finally {
      setLoading(false);
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const openModal = (data) => {
    setModalOpen(true);
    setSelectedData(data);
  };

  return (
    <>
      <tr>
        <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
          {user?.fullName}
        </td>
        <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
          {user?.email}
        </td>
        <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
          {user?.phone}
        </td>
        <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
          {user?.role}
        </td>
        <td className="h-12 flex justify-center gap-2 items-center px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
          {user?.role === "user" ? (
            <div>
              {!user?.isBlock ? (
                <button
                  onClick={() => handleBlockUser(user?._id)}
                  className="px-3 py-1 rounded-md bg-red-400 text-white font-medium"
                >
                  block
                </button>
              ) : (
                <button className="px-3 py-1 rounded-md bg-red-600 text-white font-medium">
                  blocked
                </button>
              )}
            </div>
          ) : user?.role === "agent" ? (
            <div>
              {user?.isApproved ? (
                <button className="px-3 py-1 rounded-md bg-primary text-white font-medium">
                  verified
                </button>
              ) : (
                <button
                  disabled={loading}
                  onClick={() => handleApproveUser(user?._id)}
                  className="px-3 py-1 rounded-md bg-yellow-500 text-white font-medium"
                >
                  verify
                </button>
              )}
            </div>
          ) : (
            <p>no action</p>
          )}

          <button
            onClick={() => openModal(user)}
            className="px-3 py-1 rounded-md bg-secondary text-white font-medium"
          >
            Transition
          </button>
        </td>
      </tr>
      {isModalOpen && (
        <TransitionModal setSidebarOpen={setModalOpen} data={selectedData} />
      )}
    </>
  );
};

export default User;
