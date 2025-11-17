import { useTransformedIngredients } from "../store/store";
import { IngredientListType, IngredientType } from "./types";

export const formatIngredients = (rowIngredients: IngredientListType[]) => {
  const transformedIngredients = useTransformedIngredients();

  const ingString = rowIngredients.reduce((acc, ing) => {
    if (transformedIngredients.hasOwnProperty(ing.ingredientId)) {
      acc += transformedIngredients[ing.ingredientId]?.name + ", ";
    }
    return acc;
  }, "");

  return ingString.slice(0, -2); // Remove the last ", "
};

export const transformIngredients = (ingredients: IngredientType[]) => {
  const transformedIngredients: Record<string, IngredientType> = {};
  ingredients.forEach((i) => (transformedIngredients[i.id] = i));
  return transformedIngredients;
};
