import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, require: true},
});

export const Usermodel = mongoose.model("users", userSchema);


