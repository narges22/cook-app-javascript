import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { RecipeType } from "../../utils/types";
import { useRecipes, useRecipesActions } from "../../store/store";
import { formatIngredients } from "../../utils/helper";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const RecipesTable = () => {
  const recipesData = useRecipes();
  const { deleteRecipe } = useRecipesActions();
  const navigate = useNavigate();

  const renderActions = (rowData: RecipeType) => {
    return (
      <Button
        id="delete-recipe"
        icon="pi pi-trash"
        rounded
        severity="danger"
        aria-label="Cancel"
        outlined
        onClick={() => deleteRecipe(rowData.id)}
      />
    );
  };

  return (
    <>
      <div className="flex justify-end pb-3">
        <Button
          label="Add New Recipe"
          icon="pi pi-external-link"
          onClick={() => navigate("/add-new-recipe")}
          className="!text-sm"
        />
      </div>
      <DataTable
        value={recipesData}
        tableStyle={{ minWidth: "50rem" }}
        stripedRows
        showGridlines
      >
        <Column field="name" header="Name"></Column>
        <Column
          field="ingredients"
          header="Ingredients"
          body={(row: RecipeType) => formatIngredients(row.ingredients)}
        ></Column>
        <Column
          header="Actions"
          body={(rowData: RecipeType) => renderActions(rowData)}
        ></Column>
      </DataTable>
    </>
  );
};

export default RecipesTable;
