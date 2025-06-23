import mongoose from "mongoose";

export const connectDb = async () => {
    await mongoose.connect('mongodb+srv://krshinde0794:kunal794@cluster0.20q9s33.mongodb.net/FoodDelivery').then(()=>console.log("Database is connected"));
}

