import useRole from "../../hooks/UseRole";
import CashOut from "./User/CashOut";
import SendMoney from "./User/SendMoney";

const Home = () => {
  const role = useRole();
  console.log(555, role);
  return (
    <div className="flex justify-center my-12">
      <div className="w-96 bg-gray-200 ">
        <div>
          <div className="flex justify-between w-full">
            <SendMoney />
            <CashOut />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
