'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RecipeGrid from "../app/components/RecipeGrid";
import { CiStar, CiUser, CiShuffle } from "react-icons/ci";
import { ModeToggle } from "./components/ModeToggle";
import SearchBar from "./components/SearchBar";


const fetchSearchResults = async (searchTerm) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const data = await response.json();
    return data.meals || []; 
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};

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
   
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(authStatus === "true");
    }

    
    fetchSearchResults("") 
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        setLoading(false);
      });
  }, []);

 
  const handleRandomRecipe = async () => {
    setLoading(true); 
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setRandomRecipe(data.meals[0]); 
        setFilteredRecipes([]);
      }
    } catch (error) {
      console.error("Error fetching random recipe:", error);
    } finally {
      setLoading(false); 
    }
  };
  

  
  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      setFilteredRecipes(recipes); 
      return;
    }

    setLoading(true); 
    const results = await fetchSearchResults(searchTerm);
    setFilteredRecipes(results); 
    setLoading(false); 
  };

  const navigateToFavorites = () => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/favorites");
    }
  };

  const navigateToRecipeDetails = (recipeId) => {
    if (!isAuthenticated) {
      router.push("/login"); 
    } else {
      router.push(`/recipes/${recipeId}`);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    setIsAuthenticated(false); 
    router.push("/login");
  };

  const navigateToProfile = () => {
    router.push("/login");
  };

  const toggleLoginDropdown = () => {
    setLoginDropdownOpen((prev) => !prev);
  };

  const navigateToLogin = () => {
    router.push("/login"); 
  };

  
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
     
      <div className="fixed top-0 left-0 w-full bg-gray-100 text-black dark:bg-gray-800 dark:text-white p-4 shadow-lg z-50 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          YummyLib
        </a>

        <div className="flex items-center space-x-6">
         
          <div className="hidden sm:block w-1/3">
            <SearchBar onSearch={handleSearch} />
          </div>

         
          <div
            className="text-2xl cursor-pointer"
            onClick={navigateToFavorites}
          >
            <CiStar className="text-yellow-500 dark:text-yellow-400" />
          </div>

       
          <div
            className="text-2xl cursor-pointer"
            onClick={handleRandomRecipe} 
          >
            <CiShuffle className="text-blue-500 dark:text-blue-400" />
          </div>

          
          <div className="relative flex items-center space-x-4">
            <ModeToggle />
            <CiUser
              className="text-2xl cursor-pointer CiUser"
              onClick={toggleDropdown}
            />
           
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

    
      <div className="pt-20">
        
        <div className="sm:hidden p-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading ? (
          <p className="text-center">Loading recipes...</p>
        ) : randomRecipe ? (
          
          <div className="mt-6 flex justify-center">
            <div className="text-center">
              <RecipeGrid recipes={[randomRecipe]} />
            </div>
          </div>
        ) : filteredRecipes.length === 0 ? (
          <p className="text-center">No recipes found matching your search.</p>
        ) : (
        
          <RecipeGrid
            recipes={filteredRecipes}
            onClick={(recipeId) => navigateToRecipeDetails(recipeId)} 
          />
        )}
      </div>
    </main>
  );
}
