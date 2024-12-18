import axios from "axios";
import { CiHeart } from "react-icons/ci";
import Link from "next/link"; 

async function fetchRecipeDetails(id) {
  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return response.data.meals ? response.data.meals[0] : null;
}

export default async function RecipeDetailsPage({ params }) {
  const recipe = await fetchRecipeDetails(params.id);

  if (!recipe) {
    return (
      <div className="p-8 text-red-600 text-center text-2xl font-bold">
        Recipe not found!
      </div>
    );
  }

  const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
    .map((num) => {
      const ingredient = recipe[`strIngredient${num}`];
      const measure = recipe[`strMeasure${num}`];
      return ingredient ? `${measure} ${ingredient}`.trim() : null;
    })
    .filter(Boolean);


  const instructions = recipe.strInstructions
    ? recipe.strInstructions.split("\n").map((step, index) => ({
        id: index + 1,
        text: step.trim(),
      }))
    : [];

  return (
    <main className="p-8 max-w-7xl mx-auto bg-gradient-to-b from-teal-50 via-white to-pink-50 dark:bg-gray-800 dark:text-white rounded-lg shadow-xl relative">

    
      <div className="mb-6">
        <Link href="/" className="text-blue-600 font-bold hover:underline text-lg dark:text-blue-400">
          &lt; Back to Home
        </Link>
      </div>

    
      <div className="absolute top-4 right-4 text-3xl text-gray-500 cursor-pointer hover:text-red-500 transition-colors">
        <CiHeart />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="lg:w-1/2">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-auto rounded-lg shadow-lg object-cover border-4 border-teal-300 dark:border-teal-600"
            style={{ maxWidth: "80%", margin: "0 auto" }} 
          />
        </div>


        <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-lg dark:bg-gray-700 dark:text-white">
          <h1 className="text-5xl font-extrabold text-teal-700 mb-4 dark:text-teal-400">
            {recipe.strMeal}
          </h1>
          <p className="text-gray-700 text-lg mb-6 dark:text-gray-300">
            Indulge in the delightful flavors of{" "}
            <span className="text-pink-600 font-bold dark:text-pink-400">{recipe.strMeal}</span>.
            Follow the instructions to prepare this dish perfectly!
          </p>

          <section className="mb-8">
            <h2 className="text-3xl font-bold text-pink-600 mb-3 underline dark:text-pink-400">
              Ingredients
            </h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 bg-teal-50 p-4 rounded-lg dark:bg-gray-600 dark:text-white">
              {ingredients.map((item, index) => (
                <li
                  key={index}
                  className="text-md text-teal-900 font-medium bg-teal-100 p-2 rounded-md shadow-sm dark:bg-gray-700 dark:text-teal-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

     
      <section className="mt-10 p-6 bg-pink-100 rounded-lg shadow-md dark:bg-gray-600 dark:text-white">
        <h2 className="text-3xl font-bold text-pink-700 mb-4 dark:text-pink-400">Instructions</h2>
        <div className="space-y-4">
          {instructions.map((step) => (
            <div key={step.id} className="bg-gray-100 p-4 rounded-md shadow-md dark:bg-gray-800 dark:text-white">
              <h3 className="text-lg font-semibold text-teal-600 dark:text-teal-300">
                Step {step.id}
              </h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* YouTube Video Embedding */}
      {recipe.strYoutube && (
        <section className="mt-10 p-6 bg-teal-50 rounded-lg shadow-md dark:bg-gray-600 dark:text-white">
          <h2 className="text-3xl font-bold text-teal-700 mb-4 dark:text-teal-400">Watch the Recipe Video</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${recipe.strYoutube.split("v=")[1]}`}
              title="Recipe Video"
              className="w-full h-full rounded-lg shadow-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      )}

      {/* External Link Section */}
      {recipe.strSource && (
        <section className="mt-6 p-6 bg-white rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
          <h3 className="text-2xl font-bold text-teal-600 mb-3 dark:text-teal-400">Recipe Source</h3>
          <a
            href={recipe.strSource}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline dark:text-blue-300"
          >
            Visit the Recipe Source
          </a>
        </section>
      )}
    </main>
  );
}
