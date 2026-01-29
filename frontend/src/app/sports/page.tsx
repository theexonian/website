"use client"

import { useEffect, useState } from "react";

type Game = { time: string, date: string; opponent: string};

export default function Sports({sport,gender,team,season,}: {sport: string;gender: string;team: string;season: string;}) {
  const [for_scrape, setForScrape] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          'http://localhost:4000/api/schedule'
        );
        const data: Game[] = await res.json();
        setForScrape(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [sport, gender, team, season]);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {for_scrape.map((game, index) => (
        <li key={index}>
          {game.time} - {game.date} - {game.opponent}
        </li>
      ))}
    </ul>
  );
}
