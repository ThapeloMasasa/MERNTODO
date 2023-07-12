export const CreateRecipes = () => {
    return (
        <div className="create-recipe">
            <h2>Create Recipes</h2>
            <form>
                <label htmlFor="name">Title</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="ingredients">Ingredients</label>
                <input type="text" id="ingredients" name="ingredients" />
                <label htmlFor="instructions">Instructions</label>
                <input type="text" id="instructions" name="instructions" />
                <label htmlFor="imageUrl">Image URL</label>
                <input type="text" id="imageUrl" name="imageUrl" />
                <label htmlFor="cookingTime">Cooking Time</label>
                <input type="text" id="cookingTime" name="cookingTime" />
                
            </form>
        </div>
    );
};