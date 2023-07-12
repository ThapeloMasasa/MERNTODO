import express from "express";
import cors from "cors";
import { RecipeModel } from "../models/recipes.js";
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
    
    try {
        const recipe = await RecipeModel.findById(req.params.id);
        const user = await UserModel.findById(req.body.userId);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes});
    }   
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/savedRecipes/ids", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.json({savedRecipes: user?.savedRecipes});
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/savedRecipes", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        const savedRecipes = await RecipeModel.find({_id: {$in: user.savedRecipes}});
        res.json({savedRecipes});
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export { router as recipeRouter };