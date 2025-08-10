import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.error("Database connected successfully");
        });
        await mongoose.connect(`${process.env.MONGODB_URI}/greencart`);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

export default connectDB;