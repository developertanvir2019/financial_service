import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CashOut = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const openModal = () => {
    setModalOpen(true);
  };

  //   send money
  const [data, setData] = useState({
    receiverPhone: "",
    senderPhone: "",
    amount: "",
    password: "",
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
      .post(
        "https://financial-backend-n1dz.onrender.com/api/transition/cashOut",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data) {
          Swal.fire("Congratulations!!!", "Cash Out success", "success");
          //   navigate("/");
        } else {
          Swal.fire("Cash Out Failed", response.error, "error");
        }
      })
      .catch((error) => {
        Swal.fire("Cash Out Failed", error.response.data.error, "error");
      });
  };
  return (
    <>
      <div
        onClick={() => openModal()}
        className="cursor-pointer w-1/2 bg-orange-500 h-28 flex justify-center items-center rounded-md"
      >
        <div>
          <svg
            stroke="currentColor"
            fill="#ffffff"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="44"
            width="44"
            className="mx-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
            ></path>
            <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"></path>
            <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"></path>
            <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"></path>
          </svg>
          <h3 className="text-2xl font-bold text-white mt-3">Cash Out</h3>
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
                Cash Out From Agent
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
                        placeholder="agent phone number"
                        className="peer relative h-10 bg-white w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      />
                      <label
                        htmlFor="receiverPhone"
                        className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Agent Phone number
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
                    <div className="relative my-2">
                      <input
                        required
                        onChange={handleInputChange}
                        id="password"
                        type={showPass ? "password" : "text"}
                        name="password"
                        placeholder="your password"
                        className="peer relative h-10 bg-transparent w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Your password
                      </label>

                      <svg
                        onClick={() => setShowPass(!showPass)}
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    </div>
                  </div>
                  {/*  <!-- Action base sized basic button --> */}
                  <div className="flex justify-end py-6 ">
                    <button
                      type="submit"
                      className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-primary px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                    >
                      <span>Cash Out</span>
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

export default CashOut;
