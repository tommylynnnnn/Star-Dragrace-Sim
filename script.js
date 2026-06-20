// -------------------- QUEENS DATABASE --------------------

const queens = [
  {
    id: 1,
    name: "Bianca",
    season: 6,
    image: "https://i.imgur.com/1.png",
    promo: "https://i.imgur.com/season6.jpg",
    stats: { runway: 9, comedy: 10, acting: 8, dancing: 5, charisma: 10 }
  },
  {
    id: 2,
    name: "Alyssa",
    season: 5,
    image: "https://i.imgur.com/2.png",
    promo: "https://i.imgur.com/season5.jpg",
    stats: { runway: 8, comedy: 8, acting: 7, dancing: 9, charisma: 10 }
  },
  {
    id: 3,
    name: "Sasha",
    season: 9,
    image: "https://i.imgur.com/3.png",
    promo: "https://i.imgur.com/season9.jpg",
    stats: { runway: 10, comedy: 7, acting: 9, dancing: 8, charisma: 9 }
  }
];

// -------------------- STATE --------------------

let selectedSeason = null;
let activeCast = [];
let currentCast = [];
let episode = 1;

// -------------------- SEASON SCREEN --------------------

function loadSeasons() {
  const container = document.getElementById("seasonContainer");

  const seasons = [...new Set(queens.map(q => q.season))];

  seasons.forEach(season => {
    const q = queens.find(x => x.season === season);

    const btn = document.createElement("div");
    btn.className = "season-btn";
    btn.style.backgroundImage = `url('${q.promo}')`;
    btn.innerText = "Season " + season;

    btn.onclick = () => {
      selectedSeason = season;
      openCastSelect();
    };

    container.appendChild(btn);
  });
}

// -------------------- CAST SELECT --------------------

function openCastSelect() {
  showPage("cast");

  const container = document.getElementById("castContainer");
  container.innerHTML = "";

  const seasonQueens = queens.filter(q => q.season === selectedSeason);

  seasonQueens.forEach(q => {
    const div = document.createElement("div");
    div.className = "queen";

    div.innerHTML = `
      <img src="${q.image}">
      <p>${q.name}</p>
    `;

    div.onclick = () => {
      if (activeCast.includes(q)) {
        activeCast = activeCast.filter(x => x !== q);
        div.classList.remove("selected");
      } else {
        activeCast.push(q);
        div.classList.add("selected");
      }
    };

    container.appendChild(div);
  });
}

// -------------------- START SEASON --------------------

function startSeason() {
  currentCast = [...activeCast];
  episode = 1;
  showPage("episode");
  runEpisode();
}

// -------------------- EPISODE ENGINE --------------------

function getScore(q) {
  const s = q.stats;
  return s.runway + s.comedy + s.acting + s.dancing + s.charisma
    + Math.random() * 10;
}

function runEpisode() {
  const results = currentCast.map(q => ({
    queen: q,
    score: getScore(q)
  }));

  results.sort((a, b) => b.score - a.score);

  const winner = results[0];
  const high = results.slice(1, 3);
  const safe = results.slice(3, -2);
  const bottom2 = results.slice(-2);

  document.getElementById("episodeTitle").innerText = "Episode " + episode;
  document.getElementById("challengeText").innerText = "Main Challenge Results";

  document.getElementById("results").innerHTML = `
    <h3>🏆 Winner: ${winner.queen.name}</h3>
    <h3>✨ High: ${high.map(q => q.queen.name).join(", ")}</h3>
    <h3>🙂 Safe: ${safe.map(q => q.queen.name).join(", ")}</h3>
    <h3>⚠️ Bottom 2: ${bottom2.map(q => q.queen.name).join(", ")}</h3>
  `;

  // Lip sync
  const eliminated = lipSync(bottom2[0].queen, bottom2[1].queen);

  eliminated.eliminated = true;
  currentCast = currentCast.filter(q => !q.eliminated);

  document.getElementById("results").innerHTML += `
    <h2>💋 Lip Sync</h2>
    <p>${eliminated.name} sashay away.</p>
  `;
}

// -------------------- LIP SYNC --------------------

function lipSync(q1, q2) {
  const s1 = getScore(q1);
  const s2 = getScore(q2);
  return s1 > s2 ? q2 : q1;
}

// -------------------- NEXT EPISODE --------------------

function nextEpisode() {
  if (currentCast.length <= 3) {
    runFinale();
    return;
  }

  episode++;
  runEpisode();
}

// -------------------- FINALE --------------------

function runFinale() {
  const winner = currentCast[Math.floor(Math.random() * currentCast.length)];

  document.getElementById("results").innerHTML = `
    <h1>👑 FINAL 3 COMPLETE</h1>
    <h2>🏆 WINNER: ${winner.name}</h2>
  `;
}

// -------------------- UTIL --------------------

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// INIT
loadSeasons();
