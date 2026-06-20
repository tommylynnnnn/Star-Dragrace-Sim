// =========================
// 👑 DRAG RACE CAST SELECTOR
// =========================

// All available queens
const allQueens = [
  {
    name: "Bianca Del Rio",
    image: "https://i.imgur.com/0Z8FQhS.jpg"
  },
  {
    name: "Aja",
    image: "https://i.imgur.com/2yaf2wb.jpg"
  },
  {
    name: "Sasha Velour",
    image: "https://i.imgur.com/8QJ5k1V.jpg"
  },
  {
    name: "Jinkx Monsoon",
    image: "https://i.imgur.com/7Y3Z7KQ.jpg"
  }
];

// Your selected cast
let selectedCast = [];

// =========================
// 🖼 Render all queens
// =========================
function renderQueens() {
  const grid = document.getElementById("queen-grid");
  grid.innerHTML = "";

  allQueens.forEach(queen => {
    const card = document.createElement("div");
    card.className = "queen-card";

    card.innerHTML = `
      <img src="${queen.image}" alt="${queen.name}">
      <p>${queen.name}</p>
    `;

    card.onclick = () => toggleQueen(queen);

    grid.appendChild(card);
  });
}

// =========================
// 🔁 Add / remove queen
// =========================
function toggleQueen(queen) {
  const exists = selectedCast.find(q => q.name === queen.name);

  if (exists) {
    // remove queen
    selectedCast = selectedCast.filter(q => q.name !== queen.name);
  } else {
    // add queen
    selectedCast.push(queen);
  }

  renderSelectedCast();
}

// =========================
// 🎭 Render selected cast
// =========================
function renderSelectedCast() {
  const container = document.getElementById("selected-cast");
  container.innerHTML = "";

  selectedCast.forEach(queen => {
    const card = document.createElement("div");
    card.className = "queen-card selected";

    card.innerHTML = `
      <img src="${queen.image}" alt="${queen.name}">
      <p>${queen.name}</p>
    `;

    container.appendChild(card);
  });
}

// =========================
// 🚀 Start Season
// =========================
function startSeason() {
  if (selectedCast.length < 2) {
    alert("Pick at least 2 queens!");
    return;
  }

  // Save cast for next page / game mode
  localStorage.setItem("cast", JSON.stringify(selectedCast));

  alert("Season starting with " + selectedCast.length + " queens!");
}

// =========================
// ▶️ INIT (run on load)
// =========================
renderQueens();
renderSelectedCast();
