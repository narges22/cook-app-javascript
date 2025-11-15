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
