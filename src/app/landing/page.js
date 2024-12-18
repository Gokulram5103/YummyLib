'use client';

import { useRouter } from 'next/navigation';
import { CiStar, CiShuffle } from 'react-icons/ci';
import { ModeToggle } from './components/ModeToggle';

export default function LandingPage() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-gray-50 text-black dark:bg-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-center text-white h-screen">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Welcome to YummyLib!
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Discover and save your favorite recipes from around the world.
          </p>
          <button
            onClick={handleLoginRedirect}
            className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition duration-300"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-100 dark:bg-gray-800 text-center">
        <h2 className="text-3xl font-semibold mb-8">Why Choose YummyLib?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
            <CiStar className="text-4xl text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Save Your Favorites</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Save and organize your favorite recipes for easy access anytime.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
            <CiShuffle className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Discover New Recipes</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Get inspired with new recipes every day. Find random meals based on your preferences.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
            <ModeToggle />
            <h3 className="text-xl font-bold mb-2">Dark Mode</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Switch between light and dark modes for a personalized browsing experience.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2024 YummyLib. All Rights Reserved.</p>
      </footer>
    </main>
  );
}
