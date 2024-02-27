import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddMoneyToAgent = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  //   send money
  const [data, setData] = useState({
    receiverPhone: "",
    senderPhone: "",
    amount: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setData((prevData) => ({
        ...prevData,
        senderPhone: decodedToken?.phone,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/transition/addMoney", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        if (data) {
          Swal.fire("Congratulations!!!", "Add money success", "success");
          //   navigate("/");
        } else {
          Swal.fire("Add Money Failed", response.error, "error");
        }
      })
      .catch((error) => {
        Swal.fire("Add Money Failed", error.response.data.error, "error");
      });
  };
  return (
    <>
      <div
        onClick={() => openModal()}
        className="cursor-pointer w-1/2 bg-green-500 h-28 flex justify-center items-center rounded-md"
      >
        <div>
          <svg
            fill="none"
            height="44"
            viewBox="0 0 24 24"
            width="44"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            <g
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="m9.5 13.75c0 .97.75 1.75 1.67 1.75h1.88c.8 0 1.45-.68 1.45-1.53 0-.91-.4-1.24-.99-1.45l-3.01-1.05c-.59-.21-.98999-.53-.98999-1.45 0-.84001.64999-1.53001 1.44999-1.53001h1.88c.92 0 1.67.78 1.67 1.75001" />
              <path d="m12 7.5v9" />
              <path d="m12 2c-5.52 0-10 4.48-10 10 0 3.94 2.28001 7.35 5.60001 8.98" />
              <path d="m22 12c0 5.52-4.48 10-10 10" />
              <path d="m22 6v-4h-4" />
              <path d="m17 7 5-5" />
            </g>
          </svg>
          <h3 className="text-2xl font-bold text-white mt-3">Add-Money</h3>
        </div>
      </div>
      {/* send money modal */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Dark background overlay */}
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            className={`w-96 h-96 fixed left-1/2 top-1/2  transform -translate-x-1/2 -translate-y-1/2  p-4 md:p-0 bg-white  z-50 text-slate-800 `}
          >
            {/* Your sidebar content goes here */}
            <div className="sticky top-0 z-40 flex  justify-end items-start px-3  py-2">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-red-200  px-3 text-black h-8 w-8 rounded-full flex justify-center items-center shadow-lg font-semibold"
              >
                X
              </button>
            </div>

            {/* main part */}

            <div>
              <h3 className="text-2xl font-medium text-secondary text-center">
                Add Money To Agent
              </h3>
              <div>
                <form
                  onSubmit={handleLoginSubmit}
                  className="px-6 my-10 pb-6 w-full md:w-96 overflow-hidden bg-white rounded-md text-slate-500 shadow-md shadow-slate-200"
                >
                  {/*  <!-- Body--> */}
                  <div className="flex flex-col space-y-8">
                    {/*      <!-- Input field --> */}
                    <div className="relative mt-6">
                      <input
                        onChange={handleInputChange}
                        required
                        id="receiverPhone"
                        type="text"
                        name="receiverPhone"
                        placeholder="Receiver phone number"
                        className="peer relative h-10 bg-white w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      />
                      <label
                        htmlFor="receiverPhone"
                        className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Receiver Phone number
                      </label>
                    </div>
                    <div className="relative mt-6">
                      <input
                        onChange={handleInputChange}
                        required
                        id="amount"
                        type="number"
                        name="amount"
                        placeholder="amount"
                        className="peer relative h-10 bg-white w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      />
                      <label
                        htmlFor="amount"
                        className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        amount
                      </label>
                    </div>
                  </div>
                  {/*  <!-- Action base sized basic button --> */}
                  <div className="flex justify-end py-6 ">
                    <button
                      type="submit"
                      className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-primary px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                    >
                      <span>Add Money</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddMoneyToAgent;
