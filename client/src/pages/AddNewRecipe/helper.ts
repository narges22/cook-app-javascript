import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().required("Recipe name is required"),
  ingredients: Yup.array()
    .min(1, "At least one ingredient is required")
    .required("Ingredients are required"),
});
