export type IngredientType = {
  category: string;
  id: string;
  name: string;
  unit: string;
};

export type IngredientListType = {
  ingredientId: string;
  quantity: number;
};

export type RecipeType = {
  id: string;
  name: string;
  ingredients: IngredientListType[];
};

export type RecipePayloadType = {
  name: string;
  ingredients: IngredientListType[];
};

export interface RecipeResponseType extends Response {
  recipe: RecipeType;
}
