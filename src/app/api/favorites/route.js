import jwt from 'jsonwebtoken';
import connectToDatabase from '../../lib/db';
import Favorite from '../../models/Fav';

export async function POST(req) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Connect to the database
    await connectToDatabase();

    // Make sure to parse the JSON body properly
    const { recipeId, recipeName, imageUrl } = await req.json(); // Using .json() to parse the body

    const favorite = new Favorite({
      userId: decoded.userId,
      recipeId,
      recipeName,
      imageUrl,
    });

    await favorite.save();
    return new Response(JSON.stringify({ message: 'Favorite added' }), { status: 201 });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return new Response('Error adding favorite', { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Connect to the database
    await connectToDatabase();

    // Make sure to parse the JSON body properly
    const { recipeId } = await req.json(); // Using .json() to parse the body

    await Favorite.deleteOne({ userId: decoded.userId, recipeId });

    return new Response(JSON.stringify({ message: 'Favorite removed' }), { status: 200 });
  } catch (error) {
    console.error('Error removing favorite:', error);
    return new Response('Error removing favorite', { status: 500 });
  }
}

export async function GET(req) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Connect to the database
    await connectToDatabase();

    const favorites = await Favorite.find({ userId: decoded.userId });
    return new Response(JSON.stringify(favorites), { status: 200 });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return new Response('Error fetching favorites', { status: 500 });
  }
}
