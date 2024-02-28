import axios from "axios";
import { useEffect, useState } from "react";
import TableFilter from "./TableFilter";
import User from "./User";
import Header from "../Shared/Header";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentNav, setCurrentNav] = useState("");
  const [searchText, setSearchText] = useState("");
  const [userData, setUserData] = useState([]);
  const [reRender, setRerender] = useState("");
  useEffect(() => {
    // Filter data based on currentNav and searchText
    const filteredData = users
      ?.filter((data) => {
        const currentNavLowerCase = currentNav?.toLowerCase();
        if (!currentNavLowerCase || currentNavLowerCase.trim() === "") {
          return true;
        }
        return data?.role?.toLowerCase() === currentNavLowerCase;
      })
      ?.filter((data) => {
        const searchLowerCase = searchText?.toLowerCase();
        // Check if any of the properties match the search text
        return data?.phone?.toLowerCase().includes(searchLowerCase);
      });

    setUserData(filteredData);
  }, [currentNav, searchText, users]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/all", {
          params: {
            role: currentNav,
            phone: searchText,
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        // Handle errors, such as network error or server error
        console.error("Error fetching total balance:", error);
      }
    };

    fetchUsers();
  }, [searchText, currentNav, reRender]);

  return (
    <>
      <Header />
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
                {!userData?.length > 0 ? (
                  <h3 className="text-center text-3xl font-semibold py-12">
                    No Data Found
                  </h3>
                ) : (
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
                    {userData?.map((user) => (
                      <User
                        setRerender={setRerender}
                        user={user}
                        key={user?._id}
                      />
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Users;
