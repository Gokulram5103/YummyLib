import axios from 'axios';

// Fetch all recipes (searching with an empty query)
export const fetchRecipes = async () => {
  const response = await axios.get(
    'https://www.themealdb.com/api/json/v1/1/search.php?s='
  );
  return response.data.meals || [];
};

// Fetch details of a specific recipe based on its ID
export const fetchRecipeDetails = async (id) => {
  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return response.data.meals ? response.data.meals[0] : null;
};

// Fetch a random recipe from the API
export const fetchRandomRecipe = async () => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching random recipe:", error);
    return null;
  }
};
