import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().required("Recipe name is required"),
  ingredients: Yup.array()
    .min(1, "At least one ingredient is required")
    .required("Ingredients are required"),
});

// .of(
//     Yup.object({
//       ingredientId: Yup.string().required(),
//       quantity: Yup.number()
//         .required("Quantity is required")
//         .min(0.1, "Quantity must be at least 0.1")
//         .positive("Quantity must be positive"),
//     })
//   )
