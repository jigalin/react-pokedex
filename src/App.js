import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import ContentPage from "./components/ContentPage";

function App() {
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [allPokemonData, setAllPokemonData] = useState([]);

  const fetchAllPokemonNames = async () => {
    console.log("POKEMON NAMES FETCHED");
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100"
      );
      const pokemonNames = await response.json();
      setAllPokemonNames(pokemonNames.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllPokemonData = async () => {
    console.log("POKEMON DATA FETCHED");
    try {
      const data = Promise.all(
        allPokemonNames.map(async (i) => await (await fetch(i.url)).json())
      );
      console.log(data);
      setAllPokemonData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getChildData = (val) => {
    console.log(val);
  };

  // const fetchAllPokemonData = () => {
  //   allPokemonNames.map((individualPokemon) =>
  //     fetch(individualPokemon.url)
  //       .then((response) => response.json())
  //       .then((data) => ??? )
  //   );
  // };

  // Initial useEffect to call the fetchData above on firstload
  useEffect(() => {
    console.log("UseEffect Called");
    fetchAllPokemonNames();
  }, []);

  // Debug Button
  const debugButton1 = () => {
    fetchAllPokemonData();
  };

  // Debug Button
  const debugButton2 = () => {
    console.log(allPokemonData.PromiseResult);
  };

  return (
    <div className="home-wrapper">
      <h1>Homepage</h1>
      <ContentPage pokeData={getChildData} />
      <h1>Debug Section</h1>
      <Button text="Fetch" onClick={debugButton1} color="green" />
      <Button text="Show" onClick={debugButton2} color="green" />
      <Button text="BING CHECK" onClick={debugButton2} color="red" />
    </div>
  );
}

export default App;
