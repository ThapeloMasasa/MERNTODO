import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
export const CreateRecipes = () => {
    const userID = useGetUserID();
    const [recipeName, setRecipeName] = useState(
        {
            name: "",
            ingredients: [],
            instructions: "",
            imageUrl: "",
            cookingTime: 0,
            userOwner: userID
        }
    );

    const navigate = useNavigate();
    

    const handleChange = (e) => {
        const {name, value} = e.target;
        setRecipeName({...recipeName, [name]: value});
    }

    const addIngredient = () => {
        setRecipeName({...recipeName, ingredients: [...recipeName.ingredients, ""]});
    }
    const handleIngredientChange = (e, index) => {
        const {value} = e.target;
        const ingredients = recipeName.ingredients;
        ingredients[index] = value;
        setRecipeName({...recipeName, ingredients});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/recipes', recipeName);
            console.log(response);
            alert("Recipe created successfully!");
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="create-recipe">
            <h2>Create Recipes</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Title</label>
                <input type="text" id="name" name="name"  onChange={handleChange}/>
                <label htmlFor="ingredients">Ingredients</label>
                {recipeName.ingredients.map((ingredient, index) => {
                    return <input type="text" id="ingredients" name="ingredients" value={ingredient} key={index} onChange={(event) => handleIngredientChange(event, index)}/>
                }
                )}
                <button type="button" onClick={addIngredient}>Add Ingredients</button>
                <label htmlFor="instructions">Instructions</label>
                <input type="text" id="instructions" name="instructions"  onChange={handleChange}/>
                <label htmlFor="imageUrl">Image URL</label>
                <input type="text" id="imageUrl" name="imageUrl"  onChange={handleChange}/>
                <label htmlFor="cookingTime">Cooking Time</label>
                <input type="text" id="cookingTime" name="cookingTime"  onChange={handleChange}/>
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    );
};