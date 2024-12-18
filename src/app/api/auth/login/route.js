import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectToDatabase from "../../../lib/db";
import User from "../../../models/User";

// Hardcoding the JWT_SECRET directly (not recommended for production)
const JWT_SECRET = "fabfdfdc39dbfba8dd6e37a84c1c0bba34d43c716f6b5379cc5794fbdcf3b872";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    await connectToDatabase();

    // Find user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Invalid credentials" }),
        { status: 401 }
      );
    }

    // Generate a JWT token using the hardcoded JWT_SECRET
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return new Response(
      JSON.stringify({ token }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging in:", error);
    return new Response(
      JSON.stringify({ message: "Error logging in", error: error.message }),
      { status: 500 }
    );
  }
}
