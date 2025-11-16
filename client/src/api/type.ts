import { IngredientListType, IngredientType, RecipeType } from "../utils/types";

export type InitialDataResponseType = {
  ingredients: IngredientType[];
  recipes: RecipeType[];
};

export type RecipePayloadType = {
  name: string;
  ingredients: IngredientListType[];
};

export interface RecipeResponseType extends Response {
  recipe: RecipeType;
}

export type IngredientPayloadType = {
  category: string;
  name: string;
  unit: string;
};

export interface IngredientResponseType extends Response {
  ingredient: IngredientType;
}
