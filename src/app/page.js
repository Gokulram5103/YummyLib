'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RecipeGrid from "../app/components/RecipeGrid";
import { fetchRecipes, fetchRandomRecipe } from "./lib/api";
import { CiStar, CiUser, CiShuffle } from "react-icons/ci";
import { ModeToggle } from "./components/ModeToggle";
import SearchBar from "./components/SearchBar";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if we are on the client side before accessing localStorage
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(authStatus === "true");
    }

    // Fetch recipes without authentication check
    fetchRecipes()
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data); // Initialize filtered recipes
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        setLoading(false);
      });
  }, []);

  // Fetch random recipe when user clicks on the random icon
  const handleRandomRecipe = async () => {
    const recipe = await fetchRandomRecipe();
    if (recipe) {
      setRandomRecipe(recipe); // Update state with random recipe
      setFilteredRecipes([]); // Clear filtered recipes when random recipe is selected
    }
  };

  const handleSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = recipes.filter(
      (recipe) =>
        recipe.strMeal && // Ensure strMeal exists
        recipe.strMeal.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredRecipes(filtered);
  };

  const navigateToFavorites = () => {
    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login page if not authenticated
    } else {
      router.push("/favorites");
    }
  };

  const navigateToRecipeDetails = (recipeId) => {
    if (!isAuthenticated) {
      router.push("/login"); // Redirect to login page if not authenticated
    } else {
      router.push(`/recipes/${recipeId}`); // Navigate to recipe details page if authenticated
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    setIsAuthenticated(false); // Update authentication state
    router.push("/login");
  };

  const navigateToProfile = () => {
    router.push("/login");
  };

  const toggleLoginDropdown = () => {
    setLoginDropdownOpen((prev) => !prev);
  };

  const navigateToLogin = () => {
    router.push("/login"); // Redirect to login page
  };

  // Close dropdown if clicked outside
  const closeDropdown = (e) => {
    if (!e.target.closest(".profile-dropdown") && !e.target.closest(".CiUser")) {
      setDropdownOpen(false);
      setLoginDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <main className="relative pt-16 bg-gray-50 text-black dark:bg-gray-900 dark:text-white min-h-screen">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full bg-gray-100 text-black dark:bg-gray-800 dark:text-white p-4 shadow-lg z-50 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          YummyLib
        </a>

        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="hidden sm:block w-1/3">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Star Icon for Favorites */}
          <div
            className="text-2xl cursor-pointer"
            onClick={navigateToFavorites}
          >
            <CiStar className="text-yellow-500 dark:text-yellow-400" />
          </div>

          {/* Random Recipe Icon */}
          <div
            className="text-2xl cursor-pointer"
            onClick={handleRandomRecipe} // Fetch random recipe on click
          >
            <CiShuffle className="text-blue-500 dark:text-blue-400" />
          </div>

          {/* Profile Icon and Dropdown */}
          <div className="relative flex items-center space-x-4">
            <ModeToggle />
            <CiUser
              className="text-2xl cursor-pointer CiUser"
              onClick={toggleDropdown}
            />
            {/* Profile Dropdown */}
            {dropdownOpen && (
              <div className="profile-dropdown absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-48 z-50">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 px-4 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Logout
                </button>
                <button
                  onClick={navigateToProfile}
                  className="block w-full text-left py-2 px-4 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Login
                </button>
              </div>
            )}

            {/* Login Dropdown */}
            {!isAuthenticated && loginDropdownOpen && (
              <div className="profile-dropdown absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-48 z-50">
                <button
                  onClick={navigateToLogin}
                  className="block w-full text-left py-2 px-4 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Below Navbar with padding for space */}
      <div className="pt-20">
        {/* Search Bar for smaller screens */}
        <div className="sm:hidden p-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading ? (
          <p className="text-center">Loading recipes...</p>
        ) : randomRecipe ? (
          // Center the random recipe content
          <div className="mt-6 flex justify-center">
            <div className="text-center">
              <RecipeGrid recipes={[randomRecipe]} /> {/* Display only the random recipe */}
            </div>
          </div>
        ) : filteredRecipes.length === 0 ? (
          <p className="text-center">No recipes found matching your search.</p>
        ) : (
          // When rendering the recipe grid, use a click handler to navigate to the recipe details
          <RecipeGrid
            recipes={filteredRecipes}
            onClick={(recipeId) => navigateToRecipeDetails(recipeId)} // Pass the recipeId to the click handler
          />
        )}
      </div>
    </main>
  );
}
