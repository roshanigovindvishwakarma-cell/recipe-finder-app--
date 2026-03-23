const recipes = [
    {
name:"Pasta",
category:"Lunch",
time:"20 min",
difficulty:"Easy",
ingredients:["Pasta","Sauce","Cheese"],
steps:["Boil pasta","Add sauce","Mix"]
}
    {name:"Biryani", category:"Dinner", time:"45 min", difficulty:"Hard"},
    {name:"Sandwich", category:"Breakfast", time:"10 min", difficulty:"Easy"},
    {name:"Burger", category:"Snacks", time:"15 min", difficulty:"Medium"},
    {name:"Pizza", category:"Dinner", time:"30 min", difficulty:"Medium"},
    {name:"Pancakes", category:"Breakfast", time:"15 min", difficulty:"Easy"},
    {name:"Noodles", category:"Lunch", time:"20 min", difficulty:"Easy"},
    {name:"Fried Rice", category:"Dinner", time:"25 min", difficulty:"Medium"},
    {name:"Salad", category:"Lunch", time:"10 min", difficulty:"Easy"},
    {name:"Omelette", category:"Breakfast", time:"5 min", difficulty:"Easy"}
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
        <div class="card">
            <h3>${r.name}</h3>
            <p>⏱ ${r.time}</p>
            <p>🔥 ${r.difficulty}</p>
            <button onclick="addFav('${r.name}')">❤️ Add</button>
        </div>`;
    });
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
