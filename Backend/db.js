const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://sagarpatil2232004:Sagar%40321@cluster0.acwsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}

module.exports = connectToMongo;
