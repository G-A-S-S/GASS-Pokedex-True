import { useState } from 'react'
import './App.css'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonData, setPokemonData] = useState(null);

  const getPokemonData = async (searchTerm) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokemon not found!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleSearch = async () => {
    const data = await getPokemonData(searchTerm);
    setPokemonData(data);
  };


  return (
    <>
      <main>
        <div className="container">

          <div className="stupiduselesscircle"></div>

          <div className="screen">

            <div className='hud'>

              <h1>Poké Tablet</h1>

              <input
                className='searchbar'
                type="text"
                placeholder="Enter Pokémon name or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') {handleSearch();}}} //press enter instead of the search button ;)
              />

              <button className='searchbutton' onClick={handleSearch}>Search</button>

              {pokemonData && (
                
                <div>
                  
                  <h2>{pokemonData.name}</h2>
                 
                  <img
                    src={pokemonData.sprites.versions['generation-v']['black-white'].animated.front_default}
                    alt={pokemonData.name}
                    style={{ width: '135px', height: '125px' }}
                  />

                  <h3>Stats:</h3>

                  <ul>

                    {pokemonData.stats.map((stat, index) => (

                      <li  key={index}>
                        {stat.stat.name}: {stat.base_stat}
                      </li>

                    ))}

                  </ul>

                </div>
              )}

            </div>

          </div>

        </div>

      </main>
    </>
  )
}

export default App