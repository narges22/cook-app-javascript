import {
  IngredientPayloadType,
  IngredientResponseType,
  RecipePayloadType,
  RecipeResponseType,
} from "../api/type";
import { IngredientType, RecipeType } from "../utils/types";

export type RecipesSlice = {
  recipes: RecipeType[];
  recipeActions: {
    setRecipes: (recipes: RecipeType[]) => void;
    fetchRecipes: () => Promise<void>;
    deleteRecipe: (id: string) => Promise<Response>;
    addRecipe: (payload: RecipePayloadType) => Promise<RecipeResponseType>;
  };
};

export type IngredientsSlice = {
  ingredients: IngredientType[];
  transformedIngredients: Record<string, IngredientType>;
  ingredientActions: {
    deleteIngredient: (id: string) => Promise<Response>;
    addIngredient: (
      payload: IngredientPayloadType
    ) => Promise<IngredientResponseType>;
  };
};

export interface CookStore extends RecipesSlice, IngredientsSlice {}
