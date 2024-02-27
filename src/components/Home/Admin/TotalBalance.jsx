import axios from "axios";
import { useEffect, useState } from "react";

const TotalBalance = () => {
  const [totalBalance, setTotalBalance] = useState(null);

  useEffect(() => {
    const fetchTotalBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/totalBalance"
        );
        setTotalBalance(response.data.totalBalance);
      } catch (error) {
        // Handle errors, such as network error or server error
        console.error("Error fetching total balance:", error);
      }
    };

    fetchTotalBalance();
  }, []);
  return (
    <div className="cursor-pointer w-1/2 bg-orange-500 h-28 flex justify-center items-center rounded-md">
      <div>
        <h2 className="text-3xl font-semibold text-white text-center">
          {totalBalance}
        </h2>
        <h3 className="text-2xl font-bold text-white mt-3">Total Money</h3>
      </div>
    </div>
  );
};

export default TotalBalance;
