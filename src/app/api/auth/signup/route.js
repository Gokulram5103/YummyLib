import bcrypt from "bcrypt";
import connectToDatabase from "../../../lib/db";
import User from "../../../models/User";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    // Validate input
    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({ message: "Username, email, and password are required" }),
        { status: 400 }
      );
    }

    await connectToDatabase(); // Ensure database connection

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({ message: "Error creating user", error: error.message }),
      { status: 500 }
    );
  }
}
