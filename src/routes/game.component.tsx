import { FC } from "react";
import './game.style.css';

interface Game {
  name: string;
  rating: number;
  link: string;
  description: string;
  tags: string[];
  releaseYear: number;
}

const GameList: FC = () => {
  const games: Game[] = [
    {
      name: "Ori and the Blind Forest",
      rating: 5,
      link: "https://www.orithegame.com/blind-forest/",
      description: "A beautiful action-platformer featuring stunning hand-painted artwork, meticulously animated character performance, and a fully orchestrated score.",
      tags: ["Platformer", "Metroidvania", "Adventure"],
      releaseYear: 2015,
    },
    {
      name: "Ori and the Will of the Wisps",
      rating: 5,
      link: "https://www.orithegame.com/",
      description: "The highly anticipated sequel that continues Ori's journey in a vast, exotic world where you'll encounter towering enemies and challenging puzzles.",
      tags: ["Action", "Adventure", "Atmospheric"],
      releaseYear: 2020,
    },
    {
      name: "Mario Party Superstars",
      rating: 5,
      link: "https://www.nintendo.com/games/detail/mario-party-superstars-switch/",
      description: "A collection of classic Mario Party boards and minigames from the Nintendo 64 era, beautifully remastered for modern gaming.",
      tags: ["Party", "Multiplayer", "Family"],
      releaseYear: 2021,
    },
  ];

  return (
    <div className="games-container">
      <header className="games-header">
        <h1>My Favorite Games</h1>
        <p>A collection of games that have left a lasting impression</p>
      </header>
      <div className="games-grid">
        {games.map((game) => (
          <a 
            href={game.link} 
            key={game.name} 
            className="game-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="game-card">
              <h2 className="game-title">{game.name}</h2>
              <div className="game-info">
                <p className="game-rating">{'⭐️ '.repeat(game.rating)}</p>
                <p>{game.description}</p>
                <p>Released: {game.releaseYear}</p>
                <div className="game-tags">
                  {game.tags.map((tag) => (
                    <span key={tag} className="game-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default GameList; 