import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
  } catch (e: any) {
    console.error(e.message);
  }
}

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("close", () => {
  console.log("Close connection from MongoDB");
});
