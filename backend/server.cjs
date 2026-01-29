globalThis.File = class File {};
globalThis.Blob = class Blob {};
globalThis.FormData = class FormData {};

const data = [{
    "fall": [{"sport": "cross_country", "gender": null, "link": "https://weareexeter.com/sports/cross-country/schedule", "team": null},
        {"sport": "field_hockey", "gender": null, "link": "https://weareexeter.com/sports/field-hockey/schedule", "team": "varsity"}], 
    "winter": [{}], 
    "spring": [{}],
}]

const express = require("express");
const cors = require("cors");
const { createRequire } = require("module");
const nodeRequire = createRequire(__filename);
const cheerio = nodeRequire("cheerio");

const app = express();

// Enable CORS for your frontend
app.use(
  cors({
    origin: "http://localhost:3000", // allow only your frontend
    methods: ["GET", "POST", "OPTIONS"],
  })
);

// Scrape function
async function scrape() {
  const res = await fetch(
    "https://weareexeter.com/sports/mens-basketball/schedule/",
    { headers: { "User-Agent": "Mozilla/5.0" } }
  );

  const html = await res.text();
  const $ = cheerio.load(html);

  const games = [];

  // ✅ Correct selector
  $(".sidearm-schedule-game-row.flex.flex-wrap.flex-align-center.row").each(
    (_index, el) => {
            const text = $(el).text();
            const nice_stuff = text
            .split("\n")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);

            const date = nice_stuff[0] ?? "";
            const time = nice_stuff[1] ?? "";

            opponent = $(el)
            .find(".sidearm-schedule-game-opponent-name")
            .text()
            .trim();
            if(opponent.includes("-")) {
                opponent = opponent.split("-")[0].trim();
            }

            games.push({ time, date, opponent });
        }
    );


  return games;
}

// API route
app.get("/api/schedule", async (_req, res) => {
  try {
    const games = await scrape();
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to scrape schedule" });
  }
});

// Start server
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
