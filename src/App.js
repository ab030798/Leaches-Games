// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const username = 'Marshall Gambit'; 

  useEffect(() => {
    axios.get(`https://lichess.org/api/games/user/{username}`)
      .then(response => {
        setGames(response.data);
        setSearchResults(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [username]);

  const handleSearch = () => {
    const filteredGames = games.filter(game => {
      return game.players.white.opening.name.includes(searchTerm) || 
             game.players.black.opening.name.includes(searchTerm);
    });
    setSearchResults(filteredGames);
  };

  const handleReset = () => {
    setSearchTerm();
    setSearchResults(games);
  };

  return (
    <div className="App">
      <h1>Games Status</h1>
      <div>
        <input
          type="text"
          placeholder="Search by player name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <ul>
        {searchResults.map(game => (
          <li key={game.id}>
            <p>White: {game.players.white.opening.name}</p>
            <p>Black: {game.players.black.opening.name}</p>
            <p>Status: {game.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
