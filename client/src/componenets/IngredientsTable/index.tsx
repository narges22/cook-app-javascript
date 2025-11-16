import { DataTable } from "primereact/datatable";
import { useIngredients, useIngredientsActions } from "../../store/store";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { IngredientType } from "../../utils/types";
import { useNavigate } from "react-router-dom";

const IngredientsTable = () => {
  const ingredientsData = useIngredients();
  const { deleteIngredient } = useIngredientsActions();
  const navigate = useNavigate();

  const renderActions = (rowData: IngredientType) => {
    return (
      <Button
        icon="pi pi-trash"
        rounded
        outlined
        severity="danger"
        aria-label="Cancel"
        onClick={() => deleteIngredient(rowData.id)}
      />
    );
  };
  return (
    <>
      <div className="flex justify-end pb-3">
        <Button
          label="Add New Ingredient"
          icon="pi pi-external-link"
          onClick={() => navigate("/add-new-ingredient")}
          className="!text-sm"
        />
      </div>
      <DataTable
        value={ingredientsData}
        tableStyle={{ minWidth: "50rem" }}
        stripedRows
        showGridlines
      >
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="unit" header="Unit"></Column>
        <Column
          header="Actions"
          body={(rowData: IngredientType) => renderActions(rowData)}
        ></Column>
      </DataTable>
    </>
  );
};

export default IngredientsTable;
