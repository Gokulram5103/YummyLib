'use client';

import { useState, useEffect } from 'react';
import { CiHeart } from 'react-icons/ci';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Make sure to include the CSS file

export default function RecipeCard({ id, title, image, strCategory, strArea }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.get('/api/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const isAlreadyFavorite = response.data.some((fav) => fav.recipeId === id);
        setIsFavorite(isAlreadyFavorite);
      } catch (error) {
        console.error('Error checking favorites:', error);
      }
    };

    checkFavorite();
  }, [id]);

  const toggleFavorite = async (e) => {
    e.stopPropagation(); // Prevent Link navigation when clicking the heart icon

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to add favorites!');
      return;
    }

    try {
      if (isFavorite) {
        // Remove from favorites
        await axios.delete('/api/favorites', {
          headers: { Authorization: `Bearer ${token}` },
          data: { recipeId: id },
        });
        setIsFavorite(false);
        toast.error('Removed from favorites!'); // Display Toast message for removing from favorites
        console.log('Favorite removed!');
      } else {
        // Add to favorites
        await axios.post(
          '/api/favorites',
          {
            recipeId: id,
            recipeName: title,
            imageUrl: image,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsFavorite(true);
        toast.success('Added to favorites!'); // Display Toast message for adding to favorites
        console.log('Favorite added!');
      }
    } catch (error) {
      console.error('Error handling favorites:', error);
      toast.error('Something went wrong!'); // Display error toast in case of failure
    }
  };

  return (
    <>
      {/* Add ToastContainer to render toasts */}
    
      
      <div className="border rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform relative">
        {/* Link only navigates when clicked outside the heart icon */}
        <Link href={`/recipe/${id}`} className="absolute inset-0" />

        <div
          className="absolute bottom-3 right-3 text-2xl cursor-pointer transition-colors"
          onClick={toggleFavorite} // Only triggers when the heart icon is clicked
        >
          <CiHeart className={isFavorite ? 'text-red-500' : 'text-gray-500'} />
        </div>

        <img src={image} alt={title} className="w-full h-48 object-cover" />

        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2 text-center">{title}</h2>
          <p className="text-sm text-gray-600 text-center">
            <span className="font-semibold">{strCategory}</span> | <span className="font-semibold ml-1">{strArea}</span>
          </p>
        </div>
      </div>
    </>
  );
}

