import mongoose from "mongoose";

// Corrected type for connection
const connection = {};

async function connectToDatabase() {
  if (connection.isConnected) {
    return;
  }

  const mongoUri = "mongodb+srv://root:root@cluster0.p46t2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  if (!mongoUri) {
    throw new Error("Please define the MONGO_URI environment variable.");
  }

  const db = await mongoose.connect(mongoUri);

  connection.isConnected = db.connections[0].readyState;
}

export default connectToDatabase;
