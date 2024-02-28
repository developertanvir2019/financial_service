import { useState } from "react";
import useRole from "../../hooks/UseRole";
import CashOut from "./User/CashOut";
import SendMoney from "./User/SendMoney";
import CashIn from "./agent/CashIn";
import RechargeReq from "./agent/RechargeReq";
import AddMoneyToAgent from "./Admin/AddMoneyToAgent";
import TotalBalance from "./Admin/TotalBalance";
import AgentRequest from "./Admin/AgentRequest";
import Header from "../Shared/Header";

const Home = () => {
  const { balance, role } = useRole();
  // console.log(555, role);
  const [showBalance, setShowBalance] = useState(false);

  // Function to toggle showing the balance
  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };
  return (
    <>
      <Header />
      <div className="flex justify-center my-12">
        <div className="w-96 bg-gray-200  rounded-md px-2 pt-4 pb-32">
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
                  {balance?.toFixed(2)}
                </p>
                {!showBalance && (
                  <p className=" font-medium absolute">
                    {role === "admin" ? "current income" : "tap for balance"}
                  </p>
                )}
              </div>
            </div>
            {role === "user" ? (
              <div className="flex justify-between gap-3  w-full">
                <SendMoney />
                <CashOut />
              </div>
            ) : role === "agent" ? (
              <div className="flex justify-between gap-3  w-full">
                <CashIn />
                <RechargeReq />
              </div>
            ) : role === "admin" ? (
              <>
                <div className="flex justify-between gap-3  w-full">
                  <AddMoneyToAgent />
                  <TotalBalance />
                </div>
                <AgentRequest />
              </>
            ) : (
              ""
            )}
          </div>
          {/* user */}
        </div>
      </div>
    </>
  );
};

export default Home;
