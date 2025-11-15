import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { RecipeType } from "../../utils/types";
import {
  useIngredients,
  useRecipes,
  useRecipesActions,
} from "../../store/store";
import { transformedIngredients } from "../../utils/helper";
import { Button } from "primereact/button";

const RecepiesTable = () => {
  const recipesData = useRecipes();
  const ingredientsData = useIngredients();
  const { deleteRecipe } = useRecipesActions();

  const formatIngredients = (row: RecipeType) => {
    return transformedIngredients(ingredientsData, row.ingredients);
  };

  const renderActions = (rowData: RecipeType) => {
    return (
      <Button
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
          body={(row: RecipeType) => formatIngredients(row)}
        ></Column>
        <Column
          header="Actions"
          body={(rowData: RecipeType) => renderActions(rowData)}
        ></Column>
      </DataTable>
    </>
  );
};

export default RecepiesTable;
