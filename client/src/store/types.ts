import { IngredientType, RecipeType } from "../utils/types";

export type RecepiesSlice = {
  recipes: RecipeType[];
  recipeActions: {
    setRecipes: (recipes: RecipeType[]) => void;
    fetchRecipes: () => Promise<void>;
    deleteRecipe: (id: string) => Promise<Response>;
  };
  ingredientActions: {
    deleteIngredient: (id: string) => Promise<Response>;
  };
};

export type IngredientsSlice = {
  ingredients: IngredientType[];
};

export interface CookStore extends RecepiesSlice, IngredientsSlice {}
