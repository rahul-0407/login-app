const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI,{
            dbName: "practice1"
        })
        .then((c)=> console.log(`Database connected with ${c.connection.host}`))
        .catch((e) => console.log(e))
}

module.exports = connectDB;