import "./styles.css";
import {Route ,Routes} from "react-router-dom"
import {  Income,Expense,Saving,Report} from "./pages/index";

import { Navbar } from "./components";
export default function App() {
  return (
    <div className="App">
      <h1>Financial Management App</h1>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Income/>} />
        <Route path="/expense" element={<Expense/>} />
        <Route path="/saving" element={<Saving/>} />
        <Route path="/report" element={<Report/>} />
      </Routes>
      <footer>
        <p>Designed and Developed by Rushikesh Waman Shirsat</p>
      </footer>
    </div>
  );
}
