import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddNewRecipe from "./pages/AddNewRecipe";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-new-recipe" element={<AddNewRecipe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
