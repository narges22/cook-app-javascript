import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Ingredients from "./pages/Ingredients";
import AddNewRecipe from "./pages/AddNewRecipe";
import AddNewIngredient from "./pages/AddNewIngredient";
import { useRecipesActions } from "./store/store";
import { useEffect } from "react";
import MenuBar from "./componenets/MenuBar";

function App() {
  const { fetchRecipes } = useRecipesActions();
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <MenuBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/add-new-recipe" element={<AddNewRecipe />} />
          <Route path="/add-new-ingredient" element={<AddNewIngredient />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
