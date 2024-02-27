import { useState } from "react";

const SendMoney = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
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
          <h3 className="text-2xl font-bold text-white mt-3">Send Money</h3>
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

            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SendMoney;
