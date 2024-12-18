import { ToastContainer } from "react-toastify";
import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ recipes }) {
  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            id={recipe.idMeal}
            title={recipe.strMeal}
            image={recipe.strMealThumb}
            strCategory={recipe.strCategory}
            strArea={recipe.strArea}
          />
        ))}
      </div>
    </>
  );
}
