import { useEffect } from "react";
import RecipesTable from "../../componenets/RecipesTable";
import { useRecipesActions } from "../../store/store";
import { TabPanel, TabView } from "primereact/tabview";
import IngredientsTable from "../../componenets/IngredientsTable";

function Home() {
  const { fetchRecipes } = useRecipesActions();
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="shadow-sm radius-2 rounded-lg px-4 py-8 bg-white">
      <TabView>
        <TabPanel header="Recipes">
          <RecipesTable />
        </TabPanel>
        <TabPanel header="Ingredients">
          <IngredientsTable />
        </TabPanel>
      </TabView>
    </div>
  );
}

export default Home;
