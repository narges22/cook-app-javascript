import { create } from "zustand";
import { IngredientType, RecipeType } from "../utils/types";
import {
  addIngredient,
  addRecipe,
  deleteIngredient,
  deleteRecipe,
  getInitialData,
} from "../api";
import { CookStore } from "./types";
import { RecipePayloadType } from "../api/type";
import { transformIngredients } from "../utils/helper";

export const useCookStore = create<CookStore>((set) => ({
  recipes: [],
  ingredients: [],
  transformedIngredients: {},
  recipeActions: {
    setRecipes: (recipes) => set({ recipes }),
    fetchRecipes: async () => {
      const res = await getInitialData();
      set({
        recipes: res.recipes,
        ingredients: res.ingredients,
        transformedIngredients: transformIngredients(res.ingredients),
      });
    },
    deleteRecipe: async (id: string) => {
      return deleteRecipe(id).then((res) => {
        if (res.status === 200) {
          set((state) => ({
            ...state,
            recipes: state.recipes.filter((rec) => rec.id !== id),
          }));
        }
        return res;
      });
    },
    addRecipe: async (payload: RecipePayloadType) => {
      return addRecipe(payload).then((res) => {
        if (res.recipe) {
          set((state) => ({
            ...state,
            recipes: [...state.recipes, res.recipe],
          }));
        }
        return res;
      });
    },
  },
  ingredientActions: {
    deleteIngredient: async (id: string) => {
      return deleteIngredient(id).then((res) => {
        if (res.status === 200) {
          set((state) => {
            const updated = { ...state.transformedIngredients };
            delete updated[id];
            return {
              ...state,
              ingredients: state.ingredients.filter((ing) => ing.id !== id),
              transformedIngredients: updated,
            };
          });
        }
        return res;
      });
    },
    addIngredient: async (payload) => {
      return addIngredient(payload).then((res) => {
        if (res.ingredient) {
          set((state) => ({
            ...state,
            ingredients: [...state.ingredients, res.ingredient],
            transformedIngredients: {
              ...state.transformedIngredients,
              [res.ingredient.id]: res.ingredient,
            },
          }));
        }
        return res;
      });
    },
  },
}));

export const useRecipes = () => useCookStore((state) => state.recipes);
export const useIngredients = () => useCookStore((state) => state.ingredients);
export const useTransformedIngredients = () =>
  useCookStore((state) => state.transformedIngredients);

export const useRecipesActions = () =>
  useCookStore((state) => state.recipeActions);

export const useIngredientsActions = () =>
  useCookStore((state) => state.ingredientActions);

export const useIngredientById = (id: string | undefined) =>
  useCookStore((state) => (id ? state.transformedIngredients[id] : undefined));
