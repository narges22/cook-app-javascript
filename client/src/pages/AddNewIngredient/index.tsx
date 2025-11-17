import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useIngredientsActions } from "../../store/store";
import { useFormik } from "formik";
import { categoryOptions, unitOptions, validationSchema } from "./helper";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import { showSuccess } from "../../utils/toast";

interface FormValues {
  name: string;
  category: string;
  unit: string;
}
interface AddNewIngredientProps {
  toast: React.RefObject<any>;
}
const AddNewIngredient = ({ toast }: AddNewIngredientProps) => {
  const { addIngredient } = useIngredientsActions();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      category: "",
      unit: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await addIngredient({
          name: values.name,
          category: values.category,
          unit: values.unit,
        });
        if (res.ingredient) {
          showSuccess(toast, "Ingredient added successfully");
          formik.resetForm();
          navigate("/ingredients");
        }
      } catch (error) {
        console.error("Error adding ingredient:", error);
      } finally {
        setLoading(false);
      }
    },
  });

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
        <h1 className="text-lg font-bold">New Ingredient</h1>
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

        <div className="flex flex-col items-start gap-2 w-full pt-4">
          <label htmlFor="category" className="text-gray-600">
            Category *
          </label>
          <Dropdown
            id="category"
            name="category"
            options={categoryOptions}
            placeholder="Select a category"
            className={`w-full text-left ${
              formik.touched.category && formik.errors.category
                ? "p-invalid"
                : ""
            }`}
            value={formik.values.category}
            onChange={(e) => formik.setFieldValue("category", e.value)}
            onBlur={formik.handleBlur}
            disabled={loading}
          />
          <div className="h-3">
            {formik.touched.category && formik.errors.category && (
              <small className="p-error">{formik.errors.category}</small>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 w-full pt-4">
          <label htmlFor="unit" className="text-gray-600">
            Unit *
          </label>
          <Dropdown
            id="unit"
            name="unit"
            options={unitOptions}
            placeholder="Select a unit"
            className={`w-full text-left ${
              formik.touched.unit && formik.errors.unit ? "p-invalid" : ""
            }`}
            value={formik.values.unit}
            onChange={(e) => formik.setFieldValue("unit", e.value)}
            onBlur={formik.handleBlur}
            disabled={loading}
          />
          <div className="h-3">
            {formik.touched.unit && formik.errors.unit && (
              <small className="p-error">{formik.errors.unit}</small>
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

export default AddNewIngredient;
