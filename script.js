const recipes = [
{
name:"Pasta",
category:"Lunch",
time:"20 min",
difficulty:"Easy",
ingredients:["Pasta","Sauce","Cheese"],
steps:["Boil pasta","Add sauce","Mix"]
},
{
name:"Biryani",
category:"Dinner",
time:"45 min",
difficulty:"Hard",
ingredients:["Rice","Chicken","Spices"],
steps:["Cook rice","Prepare masala","Mix and steam"]
},
{
name:"Sandwich",
category:"Breakfast",
time:"10 min",
difficulty:"Easy",
ingredients:["Bread","Butter","Vegetables"],
steps:["Apply butter","Add veggies","Toast"]
},
{
name:"Burger",
category:"Snacks",
time:"15 min",
difficulty:"Medium",
ingredients:["Buns","Patty","Sauce"],
steps:["Cook patty","Assemble burger","Serve"]
},
{
name:"Pizza",
category:"Dinner",
time:"30 min",
difficulty:"Medium",
ingredients:["Base","Cheese","Toppings"],
steps:["Add toppings","Bake","Serve"]
},
{
name:"Pancakes",
category:"Breakfast",
time:"15 min",
difficulty:"Easy",
ingredients:["Flour","Milk","Eggs"],
steps:["Mix","Cook","Serve"]
},
{
name:"Noodles",
category:"Lunch",
time:"20 min",
difficulty:"Easy",
ingredients:["Noodles","Veggies","Sauce"],
steps:["Boil","Fry","Mix"]
},
{
name:"Fried Rice",
category:"Dinner",
time:"25 min",
difficulty:"Medium",
ingredients:["Rice","Veggies","Soy sauce"],
steps:["Cook rice","Fry","Mix"]
},
{
name:"Salad",
category:"Lunch",
time:"10 min",
difficulty:"Easy",
ingredients:["Vegetables","Salt","Lemon"],
steps:["Cut","Mix","Serve"]
},
{
name:"Omelette",
category:"Breakfast",
time:"5 min",
difficulty:"Easy",
ingredients:["Eggs","Salt","Oil"],
steps:["Beat eggs","Cook","Serve"]
}
];

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function displayRecipes(list) {
    const container = document.getElementById("recipes");
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p>No results found</p>";
        return;
    }

    list.forEach(r => {
        container.innerHTML += `
        <div class="card" onclick="showDetails('${r.name}')">
            <h3>${r.name}</h3>
            <p>⏱ ${r.time}</p>
            <p>🔥 ${r.difficulty}</p>
            <button onclick="event.stopPropagation(); addFav('${r.name}')">❤️ Add</button>
        </div>`;
    });
}

function showDetails(name) {
    const recipe = recipes.find(r => r.name === name);

    alert(
        recipe.name + "\n\n" +
        "Ingredients: " + recipe.ingredients.join(", ") + "\n\n" +
        "Steps: " + recipe.steps.join(" → ")
    );
}

function addFav(name) {
    if (!favorites.includes(name)) {
        favorites.push(name);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        displayFav();
    }
}

function displayFav() {
    const container = document.getElementById("favorites");
    container.innerHTML = "";

    favorites.forEach(f => {
        container.innerHTML += `
        <div class="card">
            ${f}
            <button onclick="removeFav('${f}')">❌ Remove</button>
        </div>`;
    });
}

function removeFav(name) {
    favorites = favorites.filter(f => f !== name);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayFav();
}

function filterCategory(cat) {
    if (cat === "All") {
        displayRecipes(recipes);
    } else {
        displayRecipes(recipes.filter(r => r.category === cat));
    }
}

document.getElementById("search").addEventListener("input", function() {
    const value = this.value.toLowerCase();
    const filtered = recipes.filter(r =>
        r.name.toLowerCase().includes(value)
    );
    displayRecipes(filtered);
});

displayRecipes(recipes);
displayFav();
