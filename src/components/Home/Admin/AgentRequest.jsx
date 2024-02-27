import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AgentRequest = () => {
  const [agents, setAgents] = useState([]);
  const handleAddTransaction = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/balance/transaction-and-delete/${id}`
      );
      // Update state to remove the balance record from UI
      Swal.fire(
        "Congratulations!!!",
        "Added the balance in agent account",
        "success"
      );
      setAgents(agents.filter((agent) => agent._id !== id));
    } catch (error) {
      console.error("Error adding transaction and deleting balance:", error);
    }
  };
  useEffect(() => {
    const fetchTotalBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/balance/all"
        );
        setAgents(response.data.balances);
      } catch (error) {
        // Handle errors, such as network error or server error
        console.error("Error fetching total balance:", error);
      }
    };

    fetchTotalBalance();
  }, []);
  return (
    <>
      {agents?.length > 0 && (
        <div className="mt-5">
          <h3 className="text-secondary font-medium text-lg">Money Requests</h3>
          <div>
            {agents?.map(({ receiver, amount, _id }) => (
              <div
                key={_id}
                className="bg-white mx-2 py-2 my-3 px-3 flex justify-between font-medium items-center"
              >
                <p>{receiver}</p>
                <p>{amount}</p>
                <button
                  onClick={() => handleAddTransaction(_id)}
                  className="py-1 rounded-md px-2 text-white bg-primary"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AgentRequest;
