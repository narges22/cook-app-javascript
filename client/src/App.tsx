import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddNewRecipe from "./pages/AddNewRecipe";
import AddNewIngredient from "./pages/AddNewIngredient";
import { useRecipesActions } from "./store/store";
import { useEffect } from "react";

function App() {
  const { fetchRecipes } = useRecipesActions();
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-new-recipe" element={<AddNewRecipe />} />
          <Route path="/add-new-ingredient" element={<AddNewIngredient />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
