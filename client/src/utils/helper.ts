import { IngredientListType, IngredientType } from "./types";

export const transformedIngredients = (
  ingredients: IngredientType[],
  rowIngredients: IngredientListType[]
) => {
  const transformedIngredients: Record<string, IngredientType> = {};
  ingredients.forEach((i) => (transformedIngredients[i.id] = i));

  const ingString = rowIngredients.reduce((acc, ing) => {
    if (transformedIngredients.hasOwnProperty(ing.ingredientId)) {
      acc += transformedIngredients[ing.ingredientId]?.name + ", ";
    }
    return acc;
  }, "");

  return ingString.slice(0, -2); // Remove the last ", "
};
