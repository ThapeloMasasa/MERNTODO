import  Express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {Usermodel} from "../models/Users.js";

const router = Express.Router();

// Register
router.post('/register', async (req, res) => {
    const {username, password} = req.body;

    const user = await Usermodel.findOne({username: username});
    if (user) {
        return res.status(400).json({message: "User already exists"});
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new Usermodel({username, password: hashedPassword});
    await newUser.save();
    res.json({message: "User created successfully"});
});
// Login
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await Usermodel.findOne({username: username});

    if (!user) {
        return res.status(400).json({message: "User does not exist"});
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({message: "Invalid credentials", password, user});
    }

    const token = jwt.sign({id: user._id}, "secret");
    res.json({token, user: {id: user._id}});
});
export {router as userRouter};