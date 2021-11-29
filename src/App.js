import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import PokeWrapper from "./components/PokeWrapper";

function App() {
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [allPokemonData, setAllPokemonData] = useState([]);

  // Initial API call to receive list of pokemon
  const fetchAllPokemonNames = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10"
      );
      const pokemonNames = await response.json();
      setAllPokemonNames(pokemonNames.results);
      console.log("pokemonNamesFetched", pokemonNames.results);
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
          return setPokeFav(initFavData, false);
        } catch (error) {
          console.log(error);
        }
      });
      const filterPromise = await Promise.all(response);
      setAllPokemonData(filterPromise);
      console.log("pokemonAllDataFetched", filterPromise);
    } catch (error) {
      console.log(error);
    }
  };

  // Set a given pokemon object with state 'Favourite' to true.
  const setPokeFav = (pokemon, favVal) => {
    pokemon.isFav = favVal;
    return pokemon;
  };

  const togglePokeFav = (pokemon) => {
    pokemon.isFav = !pokemon.isFav;
    console.log(
      "Pokemon is " + pokemon.name + " and fav state is " + pokemon.isFav
    );
    return pokemon;
  };

  // Debug function for prop drilling up data from components below.
  // const getChildData = (val) => {
  //   console.log(val);
  // };

  // Initial useEffect to call the fetchData above on firstload.
  useEffect(() => {
    console.log("UseEffect Called");
    fetchAllPokemonNames();
  }, []);

  // useEffect on update of PokemonNames - call update PokemonData.
  useEffect(() => {
    if (!allPokemonNames) return;
    fetchAllPokemonData();
  }, [allPokemonNames]);

  // Debug Button 1 - call fetch pokedata function
  const debugButton1 = () => {
    fetchAllPokemonData();
  };

  // Debug Button 2 - log pokedata
  const debugButton2 = () => {
    console.log(allPokemonData);
  };

  return (
    <div className="home-wrapper">
      <h1>Homepage</h1>
      <PokeWrapper
        allPokemonData={allPokemonData}
        togglePokeFav={togglePokeFav}
      />
      <h1>Debug Section</h1>
      <Button text="Fetch" onClick={debugButton1} color="green" />
      <Button text="Show" onClick={debugButton2} color="green" />
      <Button text="BING CHECK" onClick={debugButton2} color="red" />
    </div>
  );
}

export default App;
