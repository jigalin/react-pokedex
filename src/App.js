import { useEffect, useState } from "react";
import "./App.css";
import PokeWrapper from "./components/PokeWrapper";
import Button from "./components/Button";
import PokemonViewerLogo from "./assets/PokemonViewer.png";

function App() {
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [shinyShowState, setShinyShowState] = useState([true]);

  // Initial useEffect to call the fetchData above on firstload.
  useEffect(() => {
    console.log("UseEffect Called");
    fetchAllPokemonNames();
  }, []);

  // useEffect on update of PokemonNames - call update PokemonData.
  useEffect(() => {
    if (!allPokemonNames) return;
    fetchAllPokemonData();
    // eslint-disable-next-line
  }, [allPokemonNames]);

  // Initial API call to receive list of pokemon
  const fetchAllPokemonNames = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100"
      );
      const pokemonNames = await response.json();
      setAllPokemonNames(pokemonNames.results);
      console.log("pokemonNamesFetched ", pokemonNames.results);
    } catch (error) {
      console.log(error);
    }
  };

  // Secondary API call to receive all individual pokemon data
  const fetchAllPokemonData = async () => {
    try {
      const response = await allPokemonNames.map(async (poke) => {
        try {
          const indPokeData = await fetch(poke.url);
          const initFavData = await indPokeData.json();
          return initPokeData(initFavData, false);
        } catch (error) {
          console.log(error);
        }
      });
      const filterPromise = await Promise.all(response);
      setAllPokemonData(filterPromise);
      console.log("pokemonAllDataFetched ", filterPromise);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to set all PokeData items to SHOW pokemon shiny
  const showAllShiny = () => {
    const data = allPokemonData.map((poke) => {
      poke.shinyShown = shinyShowState;
      return poke;
    });
    setAllPokemonData(data);
    setShinyShowState(!shinyShowState);
  };

  // Set a given pokemon object with state 'Favourite' to true.
  const initPokeData = (pokemon, favVal) => {
    pokemon.isFav = favVal;
    pokemon.shinyShown = false;
    return pokemon;
  };

  const shinyToggle = (pokemon) => {
    pokemon.shinyShown = !pokemon.shinyShown;
    return pokemon;
  };

  const togglePokeFav = (pokemon) => {
    pokemon.isFav = !pokemon.isFav;
    console.log(
      "Pokemon is " + pokemon.name + " and fav state is " + pokemon.isFav
    );
    return pokemon;
  };

  return (
    <div className="home-wrapper">
      <div className="header">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={PokemonViewerLogo}
            style={{
              width: "300px",
              padding: "20px",
              marginTop: "20px",
            }}
            alt="Pokemon Viewer Logo"
          />
        </div>
      </div>

      <PokeWrapper
        allPokemonData={allPokemonData}
        togglePokeFav={togglePokeFav}
        shinyToggle={shinyToggle}
        shinyShowState={shinyShowState}
        showAllShiny={showAllShiny}
      />
    </div>
  );
}

export default App;
