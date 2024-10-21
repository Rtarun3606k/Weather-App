import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import APPRouter from "./APPRouter";

function App() {
  return (
    <>
      <APPRouter />
      <ToastContainer />
    </>
  );
}

export default App;
