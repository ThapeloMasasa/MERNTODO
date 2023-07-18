import express from "express";
import cors from "cors";
import { RecipeModel } from "../models/recipes.js";
import { UserModel } from "../models/Users.js";
import mongoose from "mongoose";


const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response= await RecipeModel.find({});
        res.json(response);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
   
}
);

router.post("/", async (req, res) => {
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/", async (req, res) => {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    
    try {
        user.savedRecipes.push(recipe);
        await user.save();
        res.status(201).json({savedRecipes: user.savedRecipes});
    }   
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.json({savedRecipes: user?.savedRecipes});
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});




export { router as recipeRouter };