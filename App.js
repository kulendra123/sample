import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Books from "./pages/Books";
import Add from "./pages/Add";
import Update from "./pages/Update";
import "./style.css"
import DropdownForm from './DropdownForm';

function App() {
  return (
    <div className="App">

<h1>Select Options from Dropdowns</h1>
<DropdownForm />
      
      
    </div>
  );
}

export default App;
