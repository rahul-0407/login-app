const app = require("./app");
const connectDB = require("./db/database");
const port = 5000;

connectDB();


app.listen(process.env.PORT , () => {
    console.log(`server is live on ${port}`);
})