import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Ingredients from "./pages/Ingredients";
import AddNewRecipe from "./pages/AddNewRecipe";
import AddNewIngredient from "./pages/AddNewIngredient";
import { useRecipesActions } from "./store/store";
import { useEffect, useRef } from "react";
import MenuBar from "./componenets/MenuBar";
import { Toast } from "primereact/toast";

function App() {
  const toast = useRef(null);
  const { fetchRecipes } = useRecipesActions();
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <BrowserRouter>
      <Toast ref={toast} />
      <div className="App">
        <MenuBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route
            path="/add-new-recipe"
            element={<AddNewRecipe toast={toast} />}
          />
          <Route
            path="/add-new-ingredient"
            element={<AddNewIngredient toast={toast} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
