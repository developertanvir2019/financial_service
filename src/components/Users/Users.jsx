import axios from "axios";
import { useEffect, useState } from "react";
import TableFilter from "./TableFilter";
import User from "./User";

const Users = () => {
  const [users, setUsers] = useState([]);
  console.log(users);
  const [currentNav, setCurrentNav] = useState("");
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/all");
        setUsers(response.data.users);
      } catch (error) {
        // Handle errors, such as network error or server error
        console.error("Error fetching total balance:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {/* code */}
      <div>
        <div className="bg-white rounded-md border m-5">
          <TableFilter
            setCurrentNav={setCurrentNav}
            currentNav={currentNav}
            users={users}
            searchText={searchText}
            setSearchText={setSearchText}
          />
          {/* table */}
          <div className="w-full overflow-x-scroll">
            <table className="w-full text-left border border-collapse rounded sm:border-separate border-slate-200">
              <tbody>
                <tr>
                  <th
                    scope="col"
                    className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                  >
                    role
                  </th>
                  <th
                    scope="col"
                    className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                  >
                    Action
                  </th>
                </tr>
                {users?.map((user) => (
                  <User user={user} key={user?._id} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
