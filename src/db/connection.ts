import mongoose from "mongoose";

export async function connect() {
  try {
    //DEFINED THE MONGODB CONNECTION URL
    const mongoAtlasURL = process.env.MONGODB_URL!;

    //SETTING UP MONOGODB CONNECTION
    mongoose.connect(mongoAtlasURL);

    //GETTING THE DEFAULT CONNECTION
    const db = mongoose.connection;

    //DEFINIG EVENT LISTENERS FOR DATABASE CONNECTION
    db.on("connected", () => console.log("Connected to MongoDB server"));

    db.on("disconnected", () =>
      console.log("Disconnected from MongoDB server")
    );

    db.on("error", (err) => {
      console.log("MongoDB server connection error: ", +err);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong:", error);
  }
}
