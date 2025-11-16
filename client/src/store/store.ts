import { create } from "zustand";
import { RecipeType } from "../utils/types";
import {
  addIngredient,
  addRecipe,
  deleteIngredient,
  deleteRecipe,
  getInitialData,
} from "../api";
import { CookStore } from "./types";
import { RecipePayloadType } from "../api/type";

export const useCookStore = create<CookStore>((set) => ({
  recipes: [],
  ingredients: [],
  recipeActions: {
    setRecipes: (recipes) => set({ recipes }),
    fetchRecipes: async () => {
      const res = await getInitialData();
      set({
        recipes: res.recipes,
        ingredients: res.ingredients,
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
        if (res.status === 200) {
          set((state) => ({
            ...StaticRange,
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
          set((state) => ({
            ...state,
            ingredients: state.ingredients.filter((ing) => ing.id !== id),
          }));
        }
        return res;
      });
    },
    addIngredient: async (payload) => {
      return addIngredient(payload).then((res) => {
        if (res.status === 200) {
          set((state) => ({
            ...state,
            ingredients: [...state.ingredients, res.ingredient],
          }));
        }
        return res;
      });
    },
  },
}));

export const useRecipes = () => useCookStore((state) => state.recipes);
export const useIngredients = () => useCookStore((state) => state.ingredients);

export const useRecipesActions = () =>
  useCookStore((state) => state.recipeActions);

export const useIngredientsActions = () =>
  useCookStore((state) => state.ingredientActions);
