import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string()
    .required("Ingredient name is required")
    .min(2, "Ingredient name must be at least 2 characters"),
  category: Yup.string().required("Category is required"),
  unit: Yup.string().required("Unit is required"),
});

export const categoryOptions = [
  { label: "Baking", value: "Baking" },
  { label: "Dairy", value: "Dairy" },
  { label: "Seasoning", value: "Seasoning" },
  { label: "Flavoring", value: "Flavoring" },
  { label: "Oil", value: "Oil" },
  { label: "Vegetable", value: "Vegetable" },
];

export const unitOptions = [
  { label: "grams", value: "grams" },
  { label: "pieces", value: "pieces" },
  { label: "ml", value: "ml" },
  { label: "teaspoons", value: "teaspoons" },
];
