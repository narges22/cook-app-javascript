import {
  IngredientPayloadType,
  IngredientResponseType,
  RecipePayloadType,
  RecipeResponseType,
} from "../api/type";
import { IngredientType, RecipeType } from "../utils/types";

export type RecepiesSlice = {
  recipes: RecipeType[];
  recipeActions: {
    setRecipes: (recipes: RecipeType[]) => void;
    fetchRecipes: () => Promise<void>;
    deleteRecipe: (id: string) => Promise<Response>;
    addRecipe: (payload: RecipePayloadType) => Promise<RecipeResponseType>;
  };
  ingredientActions: {
    deleteIngredient: (id: string) => Promise<Response>;
    addIngredient: (
      payload: IngredientPayloadType
    ) => Promise<IngredientResponseType>;
  };
};

export type IngredientsSlice = {
  ingredients: IngredientType[];
};

export interface CookStore extends RecepiesSlice, IngredientsSlice {}
