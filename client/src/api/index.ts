import {
  IngredientPayloadType,
  IngredientResponseType,
  InitialDataResponseType,
  RecipePayloadType,
  RecipeResponseType,
} from "./type";

const URL = "http://localhost:3001";
export const getInitialData = async (): Promise<InitialDataResponseType> => {
  return fetch(`${URL}/api/data`).then((response) => response.json());
};

const headers = {
  "Content-Type": "application/json",
};

export const addRecipe = async (
  payload: RecipePayloadType
): Promise<RecipeResponseType> => {
  return fetch(`${URL}/api/recipes`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
  }).then((response) => response.json());
};

export const addIngredient = async (
  payload: IngredientPayloadType
): Promise<IngredientResponseType> => {
  console.log(payload);
  return fetch(`${URL}/api/ingredients`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
  }).then((response) => response.json());
};

export const deleteIngredient = async (id: string): Promise<Response> => {
  return await fetch(`${URL}/api/ingredients/${id}`, {
    method: "DELETE",
  });
};

export const deleteRecipe = async (id: string): Promise<Response> => {
  return await fetch(`${URL}/api/recipes/${id}`, {
    method: "DELETE",
  });
};
