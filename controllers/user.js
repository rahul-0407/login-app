const User = require("../models/user");
const bcrypt = require("bcrypt");
const sendCookies = require("../utils/feature");
const {ErrorHandler} = require("../middlewares/error");


const login = async (req,res) => {
    try {
        res.render("login")
    } catch (error) {
        console.log(error)
    }
};

const loginUser = async (req,res,next) => {
    try {
        const {email, password} = req.body;

        let user = await User.findOne({email}).select("+password");

        if(!user) return next(new ErrorHandler("User doesn't exist", 400));

        const isMatch = bcrypt.compare(password, user.password)

        if(!isMatch) return next(new ErrorHandler("Invalid id", 400));

        sendCookies(user, res, 201);
        // sendCookies(user, res, Welcome back `${user.name}` , 201);

        res.redirect("/me");

    } catch (error) {
        console.log(error);
    }
}

const register = async (req,res) => {
    try {
        res.render("register")
    } catch (error) {
        console.log(error)
    }
}

const newUser = async (req,res,next) => {
    try {
        const {name, email, password} = req.body;

        let user = await User.findOne({email});

        if(user) return next(new ErrorHandler("User already exist", 404));

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({name, email, password:hashedPassword});

        sendCookies(user, res, 201);
        // sendCookies(user, res, "Registered successfully", 201)

    } catch (error) {
        console.log(error);
    }
}

const getProfile = async (req,res) => {

    res.render("profile",{username: req.user.name});

    // res.status(200).json({
    //     success:true,
    //     user: req.user,
    // })
}

module.exports = {
    newUser,
    register,
    login,
    loginUser,
    getProfile,
}