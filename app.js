const express = require("express")
const ejs = require("ejs")
const path = require("path")
const {config}  =require("dotenv");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser")
const {errorMiddleware} = require("./middlewares/error")

config({
    path: "./db/config.env"
})


const app = express();




app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// app.use(userRouter);
app.use(userRouter);


app.get("/", (req,res) => {
    res.render("index");

})


//using error middleware
app.use(errorMiddleware);






module.exports = app;