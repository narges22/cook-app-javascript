import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { generateRecipeId, generateIngredientId } from "./utils.js";

// Replace __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const dataFile = path.join(__dirname, "data.json");

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// GET all data
app.get("/api/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  res.json(data);
});

// POST data
app.post("/api/data", (req, res) => {
  fs.writeFileSync(dataFile, JSON.stringify(req.body, null, 2));
  res.json({ message: "Data saved!" });
});

// POST ingredient - add a new ingredient to the ingredients list
app.post("/api/ingredients", (req, res) => {
  try {
    const { name, unit, category } = req.body;

    // Validate required fields
    if (!name || !unit || !category) {
      return res.status(400).json({
        message:
          "Invalid ingredient data. Name, unit, and category are required.",
      });
    }

    // Read existing data
    const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));

    // Generate a new ingredient ID
    const newIngredientId = generateIngredientId(data.ingredients, req.body.id);

    // Create new ingredient object
    const newIngredient = {
      id: newIngredientId,
      name,
      unit,
      category,
    };

    // Add ingredient to the ingredients array
    data.ingredients.push(newIngredient);

    // Write updated data back to file
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

    res.status(200).json({
      message: "Ingredient added successfully",
      ingredient: newIngredient,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding ingredient", error: error.message });
  }
});

// POST recipe - add a new recipe to the recipes list
app.post("/api/recipes", (req, res) => {
  try {
    const { name, ingredients } = req.body;
    // Validate required fields
    if (!name || !ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({
        message:
          "Invalid recipe data. Name and ingredients array are required.",
      });
    }

    // Read existing data
    const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));

    // Generate a new recipe ID
    const newRecipeId = generateRecipeId(data.recipes, req.body.id);

    // Create new recipe object
    const newRecipe = {
      id: newRecipeId,
      name,
      ingredients,
    };

    // Add recipe to the recipes array
    data.recipes.push(newRecipe);

    // Write updated data back to file
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

    res.status(200).json({
      message: "Recipe added successfully",
      recipe: newRecipe,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding recipe", error: error.message });
  }
});

// DELETE recipe by ID
app.delete("/api/recipes/:id", (req, res) => {
  try {
    const recipeId = req.params.id;
    const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));

    const recipeIndex = data.recipes.findIndex(
      (recipe) => recipe.id === recipeId
    );

    if (recipeIndex === -1) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    data.recipes.splice(recipeIndex, 1);
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

    res.json({ message: "Recipe deleted successfully", recipeId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting recipe", error: error.message });
  }
});

// DELETE ingredient by ID
app.delete("/api/ingredients/:id", (req, res) => {
  try {
    const ingredientId = req.params.id;
    const data = JSON.parse(fs.readFileSync(dataFile, "utf-8"));

    const ingredientIndex = data.ingredients.findIndex(
      (ingredient) => ingredient.id === ingredientId
    );

    if (ingredientIndex === -1) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    // Remove ingredient from ingredients array
    data.ingredients.splice(ingredientIndex, 1);
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

    res.json({
      message: "Ingredient deleted successfully",
      ingredientId,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting ingredient", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
