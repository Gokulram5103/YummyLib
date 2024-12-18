'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token"); 
      if (!token) {
        router.push("/login"); 
        return;
      }

      try {
        const response = await axios.get("/api/favorites", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setFavorites(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError("Failed to load favorites. Please try again.");
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [router]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Your Favorites</h1>
        <Link
          href="/"
          className="text-blue-500 hover:underline font-medium"
        >
          Back to Home
        </Link>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.length > 0 ? (
            favorites.map((favorite) => (
              <div
                key={favorite.recipeId}
                className="border rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform relative"
              >
                <img
                  src={favorite.imageUrl}
                  alt={favorite.recipeName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">
                    {favorite.recipeName}
                  </h2>
                  <Link
                    href={`/recipe/${favorite.recipeId}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No favorites yet. Start adding some!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
