This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

YummyLib
YummyLib is a recipe management web application designed to help users discover, search, and save their favorite recipes. Users can explore a variety of recipes, search based on meal names, and get a random recipe at the click of a button. The app also includes user authentication to ensure personalized experience and the ability to save favorite recipes.

Features
User Authentication: Secure login and token-based authentication for accessing the app.
Recipe Search: Search recipes by meal name using a dynamic search bar.
Random Recipe: Generate a random recipe with the click of a button for an element of surprise.
Favorites: Save your favorite recipes and easily access them later.
Dark Mode: Toggle between light and dark modes for a better user experience.
Tech Stack
Frontend: React.js, Next.js, Tailwind CSS
Backend: MealDb API
Authentication: LocalStorage (JWT/token-based)
UI Components: ShadCN UI (with mode toggle for dark/light mode)
Icons: React Icons (CiStar, CiShuffle, CiUser)


How to Use
Login:
Upon visiting the site, users are prompted to log in.
Use your credentials (in case there's a mock authentication or external login system).
Search Recipes:
You can use the search bar to find recipes based on meal names.
Random Recipe:
Click the shuffle icon to generate a random recipe. The random recipe will replace any existing ones on the screen.
Favorites:
Click the star icon to navigate to the Favorites page, where you can view and manage saved recipes.
Dark Mode:
You can toggle between light and dark modes using the mode toggle in the profile dropdown.
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
