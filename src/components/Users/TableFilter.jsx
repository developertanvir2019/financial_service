/* eslint-disable react/prop-types */
import { CiSearch } from "react-icons/ci";
const TableFilter = ({
  users,
  currentNav,
  setCurrentNav,
  searchText,
  setSearchText,
}) => {
  return (
    <>
      <div className="mt-4 px-4 py-4 block lg:flex justify-between gap-12 items-center ">
        <div>
          <ul className="flex text-slate-700  items-center gap-6 border-b border-slate-100  pl-2">
            <li
              onClick={() => setCurrentNav("")}
              className={`cursor-pointer pb-2 px-1 flex gap-2${
                currentNav === ""
                  ? " border-b-[0.2rem] font-medium  border-slate-800"
                  : ""
              }`}
            >
              All
              <span className="bg-slate-700 text-white px-2 rounded-md">
                {users?.length ? users?.length : "0"}
              </span>
            </li>
            <li
              onClick={() => setCurrentNav("User")}
              className={`cursor-pointer pb-2 px-1 flex gap-2${
                currentNav === "Users"
                  ? " border-b-[0.2rem] font-medium  border-slate-800 "
                  : ""
              }`}
            >
              Users
              <span className="bg-green-300 text-green-600 px-2 rounded-md">
                {users?.filter((user) => user?.role == "user")?.length}
              </span>
            </li>
            <li
              onClick={() => setCurrentNav("Agent")}
              className={`cursor-pointer pb-2 px-1 flex gap-2${
                currentNav === "Agent"
                  ? " border-b-[0.2rem] font-medium  border-slate-800 "
                  : ""
              }`}
            >
              Agent
              <span className="bg-red-300 text-red-600 px-2 rounded-md">
                {users?.filter((user) => user?.role == "agent")?.length}
              </span>
            </li>
          </ul>
        </div>
        <div className="relative  my-6 flex-1 w-full">
          <input
            id="id-l16"
            type="text"
            name="id-l16"
            placeholder="Search by  phone number"
            value={searchText}
            onChange={({ target }) => setSearchText(target.value)}
            className="relative bg-transparent w-full h-12  px-4  transition-all border rounded outline-none peer border-slate-200  text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
          />
          <CiSearch className="absolute w-6 h-6 cursor-pointer top-3 right-4 stroke-slate-400 peer-disabled:cursor-not-allowed" />
        </div>
      </div>
    </>
  );
};

export default TableFilter;
