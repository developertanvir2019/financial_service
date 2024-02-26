import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/router";

function App() {
  return (
    <div className="flex justify-center">
      <div style={{ maxWidth: "1280px" }} className="w-full bg-[#EBECF0]">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </div>
  );
}

export default App;
