import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { RefObject, useMemo, useState } from "react";
import { useIngredients, useRecipesActions } from "../../store/store";
import { useFormik } from "formik";
import { IngredientListType } from "../../utils/types";
import { validationSchema } from "./helper";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { useNavigate } from "react-router-dom";
import { Divider } from "primereact/divider";
import IngredientChip from "../../componenets/IngredientChip";
import { showSuccess } from "../../utils/toast";
import LabelText from "./Label";

interface FormValues {
  name: string;
  ingredients: IngredientListType[];
  ingredient: string;
  quantity: number;
}
interface AddNewRecipeProps {
  toast: RefObject<any>;
}
const AddNewRecipe = ({ toast }: AddNewRecipeProps) => {
  const ingredientsData = useIngredients();

  const { addRecipe } = useRecipesActions();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      ingredients: [],
      ingredient: "",
      quantity: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await addRecipe({
          name: values.name,
          ingredients: values.ingredients,
        });
        if (res.recipe) {
          showSuccess(toast, "Recipe added successfully");
          formik.resetForm();
          navigate("/");
        }
      } catch (error) {
        console.error("Error adding recipe:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  const ingredientOptions = useMemo(() => {
    return ingredientsData.map((ing) => ({
      label: ing.name,
      value: ing.id,
    }));
  }, [ingredientsData]);

  const addIngredient = () => {
    if (formik.values.ingredient && formik.values.quantity) {
      const newIngredient: IngredientListType = {
        ingredientId: formik.values.ingredient,
        quantity: formik.values.quantity,
      };

      formik.setValues({
        ...formik.values,
        ingredients: [...formik.values.ingredients, newIngredient],
        ingredient: "",
        quantity: 0,
      });
    }
  };

  const removeIngredient = (ingredientId: string) => {
    const updatedIngredients = formik.values.ingredients.filter(
      (ing) => ing.ingredientId !== ingredientId
    );
    formik.setFieldValue("ingredients", updatedIngredients);
    return !!ingredientId;
  };

  return (
    <div className="shadow-sm radius-2 rounded-lg px-4 py-8 bg-white">
      <div className="flex items-center gap-3 pb-2">
        <Button
          icon="pi pi-arrow-left"
          rounded
          text
          onClick={() => navigate("/")}
          aria-label="Back"
        />
        <h1 className="text-lg font-bold">New Recipe</h1>
      </div>
      <Divider />
      <form>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="name" className="text-gray-600">
            Name *
          </label>
          <InputText
            id="name"
            name="name"
            aria-describedby="name-help"
            className={`w-full ${
              formik.touched.name && formik.errors.name ? "p-invalid" : ""
            }`}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={loading}
          />
          <div className="h-3">
            {formik.touched.name && formik.errors.name && (
              <small id="name-help" className="p-error">
                {formik.errors.name}
              </small>
            )}
          </div>
        </div>
        <p className="text-left pt-5 pb-3">Choose the ingredients</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex flex-col items-start gap-2 w-full col-12 sm:col-6">
            <label htmlFor="ingredient" className="text-gray-600">
              Ingredient *
            </label>
            <Dropdown
              id="ingredient"
              options={ingredientOptions}
              placeholder="Select an ingredient"
              className="w-full"
              value={formik.values.ingredient}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
          </div>
          <div className="flex flex-col items-start gap-2 w-full col-12 sm:col-6">
            <label htmlFor="quantity" className="text-gray-600">
              Quantity * <LabelText ingredientId={formik.values.ingredient} />
            </label>
            <InputNumber
              id="quantity"
              name="quantity"
              value={formik.values.quantity}
              onValueChange={(e) =>
                formik.setFieldValue("quantity", e.value || 0)
              }
              onBlur={formik.handleBlur}
              min={0}
              step={1}
              showButtons
              className="w-full"
              disabled={loading}
            />
          </div>

          <div className="flex items-end col-12 sm:col-auto">
            <Button
              label="Save"
              type="button"
              onClick={addIngredient}
              className="w-full sm:w-auto"
              outlined
              disabled={
                loading || !formik.values.ingredient || !formik.values.quantity
              }
            />
          </div>
        </div>
        <div className="py-3 flex flex-col items-start gap-2">
          <div className="flex items-start gap-2 flex-wrap">
            {formik.values.ingredients.map((ing) => (
              <IngredientChip
                key={ing.ingredientId}
                ingredientId={ing.ingredientId}
                qty={ing.quantity}
                onRemove={removeIngredient}
                disabled={loading}
              />
            ))}
          </div>
          <div className="h-3">
            {formik.touched.ingredients && formik.errors.ingredients && (
              <small className="p-error">
                {formik.values.ingredients.length < 1 &&
                  "At least one ingredient is required"}
              </small>
            )}
          </div>
        </div>
      </form>
      <div className="flex justify-end py-3 pt-6">
        <Button
          label="Submit"
          type="submit"
          onClick={() => formik.handleSubmit()}
          disabled={loading}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AddNewRecipe;
