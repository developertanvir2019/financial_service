import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [showPass, setShowPass] = useState(true);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/user/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data.token);
        if (data?.token) {
          localStorage.setItem("jwtToken", data.token);
          Swal.fire("Congratulations!!!", "Log in success", "success");
          navigate("/");
          // window.location.reload();
        } else {
          Swal.fire("Login Failed", response.error, "error");
        }
      })
      .catch((error) => {
        Swal.fire("Login Failed", error.response.data.error, "error");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleLoginSubmit}
        className=" mt-10 pb-6 w-full md:w-96 overflow-hidden bg-white rounded-md text-slate-500 shadow-md shadow-slate-200"
      >
        {/*  <!-- Body--> */}
        <div className="p-6">
          <header className="mb-4 text-center">
            <span className="text-2xl font-medium text-slate-700 border-b-[1.5px] border-primary pb-1 ">
              Login
            </span>
          </header>
          <div className="flex flex-col space-y-8">
            {/*      <!-- Input field --> */}
            <div className="relative mt-6">
              <input
                onChange={handleInputChange}
                required
                id="emailOrPhone"
                type="text"
                name="emailOrPhone"
                placeholder="email or phone number"
                className="peer relative h-10 bg-white w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label
                htmlFor="emailOrPhone"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Email or Phone number
              </label>
            </div>
            {/*      <!-- Input field --> */}
            <div className="relative my-6">
              <input
                onChange={handleInputChange}
                required
                id="password"
                type={showPass ? "password" : "text"}
                name="password"
                placeholder="your password"
                className="peer relative h-10 bg-white w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
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
        </div>
        {/*  <!-- Action base sized basic button --> */}
        <div className="flex justify-end pb-6 px-6">
          <button
            type="submit"
            className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-primary px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
          >
            <span>Log in</span>
          </button>
        </div>
        <div className="px-5 pb-5">
          <p className="text-gray-500">Don{"'"}t have account?</p>
          <Link to="/register">
            <span className="underline font-semibold text-primary">
              create account
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
