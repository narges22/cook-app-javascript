import { InitialDataResponseType } from "./type";

const URL = "http://localhost:3001";
export const getInitialData = async (): Promise<InitialDataResponseType> => {
  return fetch(`${URL}/api/data`).then((response) => response.json());
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
