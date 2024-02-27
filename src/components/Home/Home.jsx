import { useState } from "react";
import useRole from "../../hooks/UseRole";
import CashOut from "./User/CashOut";
import SendMoney from "./User/SendMoney";
import CashIn from "./agent/CashIn";

const Home = () => {
  const { balance, role } = useRole();
  // console.log(555, role);
  const [showBalance, setShowBalance] = useState(false);

  // Function to toggle showing the balance
  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };
  return (
    <div className="flex justify-center my-12">
      <div className="w-96 bg-gray-200  rounded-md px-2 pt-4 pb-32">
        {/* user */}
        {role === "user" ? (
          <div className="">
            <div className="flex justify-center py-5">
              <div
                onClick={toggleBalance}
                className="relative cursor-pointer w-32 h-8 rounded-2xl bg-white flex justify-center items-center"
              >
                <p
                  className={` font-medium text-primary ${
                    showBalance ? "" : "blur"
                  }`}
                >
                  {balance.toFixed(2)}
                </p>
                {!showBalance && (
                  <p className=" font-medium absolute">tap for balance</p>
                )}
              </div>
            </div>
            <div className="flex justify-between gap-3  w-full">
              <SendMoney />
              <CashOut />
            </div>
          </div>
        ) : role === "agent" ? (
          // start agent
          <div className="">
            <div className="flex justify-center py-5">
              <div
                onClick={toggleBalance}
                className="relative cursor-pointer w-32 h-8 rounded-2xl bg-white flex justify-center items-center"
              >
                <p
                  className={` font-medium text-primary ${
                    showBalance ? "" : "blur"
                  }`}
                >
                  {balance.toFixed(2)}
                </p>
                {!showBalance && (
                  <p className=" font-medium absolute">tap for balance</p>
                )}
              </div>
            </div>
            <div className="flex justify-between gap-3  w-full">
              <CashIn />
              {/* <CashOut /> */}
            </div>
          </div>
        ) : // end agent
        role === "admin" ? (
          <div>admin</div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default Home;
