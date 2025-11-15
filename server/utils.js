export const generateRecipeId = (existingRecipes, providedId = null) => {
  if (providedId) {
    // Check if provided ID already exists
    if (existingRecipes.some((recipe) => recipe.id === providedId)) {
      return null; // ID already exists
    }
    return providedId;
  }

  // Generate ID following the pattern rec1, rec2, etc.
  const existingIds = existingRecipes.map((recipe) => recipe.id);
  let counter = 1;
  let newId;
  do {
    newId = `rec${counter}`;
    counter++;
  } while (existingIds.includes(newId));

  return newId;
};
