import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";


export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);

    const userId = useGetUserID();

    useEffect(() => {
       
        
            const getRecipes = async () => {
                try {
                    const response = await axios.get("http://localhost:3001/recipes");
                    setRecipes(response.data);
                    
                }
                catch (error) {
                    console.log(error);
                }
            };
           
           
       

        const getSavedRecipes = async () => {
            try {
            const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userId}`);
            setSavedRecipes(response.data);
            console.log(response, "saved recipes");
           
            }
            catch(error){
                console.log(error)
            }
        };
    
        getRecipes();
        getSavedRecipes()
    }, [userId]);

    const savedRecipe = async (recipeID) => {
        try {
            const response = await axios.put('http://localhost:3001/recipes', {
                recipeID,
                userId
            });
            console.log(response);
            alert("Recipe saved successfully!");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) => {
                    return <li key={recipe.id}>
                         <div><h2>{recipe.name}</h2></div>
                         
                    <button type="button" onClick={()=>savedRecipe(recipe._id)}>Save</button>
                    <div className="instructions">
                        <p>{recipe.instructions}</p>
                    </div>
                    <div className="imageUrl">
                        <img src={recipe.imageUrl} alt={recipe.name} />
                    </div>
                    <div className="cookingTime">
                        <p>Cooking Time: {recipe.cookingTime} Minutes</p>
                    </div>

                    </li>;
                })}
            </ul>
        </div>
    );
};