const queens = [

{
  Name: "Victoria 'Porkchop' Parker",
  Image: "assets/porkchop.jpg",
  Acting: 0,
  Comedy: 0,
  Dance: 0,
  Design: 1,
  Lipsync: 1,
  Talent: 0,
  Season: 1
},
{
  Name: "Tammie Brown",
  Acting: 3,
  Comedy: 1,
  Dance: 1,
  Design: 3,
  Lipsync: 1,
  Talent: 0,
  Season: 1
}
  
];


// This function runs automatically to display your queens on the screen
function displayQueensPool() {
  // 1. Find the empty grid container in your HTML
  const poolContainer = document.getElementById("queens-pool");
  
  // Clear it out just in case
  poolContainer.innerHTML = "";

  // 2. Loop through every queen in your array
  queens.forEach((queen, index) => {
    // 3. Create a piece of HTML for each queen card
    const cardHtml = `
      <div class="queen-card">
        <img src="${queen.Image}" alt="${queen.Name}">
        <h3>${queen.Name}</h3>
        <p>Season ${queen.Season}</p>
        <button onclick="addToCast(${index})">Add to Cast</button>
      </div>
    `;
    
    // 4. Drop that card into the container
    poolContainer.innerHTML += cardHtml;
  });
}

// 5. Call the function so it loads the moment the page opens!
displayQueensPool();
