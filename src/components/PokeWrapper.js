import { useState, useEffect } from "react";
import "./PokeWrapper.css";
import PokemonCard from "./PokemonCard";
import Button from "./Button";

const ContentPage = ({
  allPokemonData,
  togglePokeFav,
  shinyToggle,
  showAllShiny,
  shinyShowState,
}) => {
  const [shownPokemonData, setShownPokemonData] = useState(allPokemonData);
  const [favCount, setFavCount] = useState(0);
  const [showFavsOnly, setShowFavsOnly] = useState(false);

  const updateFavCount = (int) => {
    console.log(favCount + int);
    setFavCount(favCount + int);
  };

  useEffect(() => {
    setShownPokemonData(allPokemonData);
  }, [allPokemonData]);

  const showFavsFunc = () => {
    if (showFavsOnly === false) {
      console.log("FavsOnly is false and now going to filter favs");
      let fav = [];
      fav = shownPokemonData.filter((data) => {
        return data.isFav === true;
      });
      setShownPokemonData(fav);
      setShowFavsOnly(true);
    } else {
      console.log("Favs is true - Resetting data to default");
      setShownPokemonData(allPokemonData);
      setShowFavsOnly(false);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Button
          onClick={showFavsFunc}
          text="Show Favourites"
          styleName="btn-onwhite"
        />
        <Button
          onClick={showAllShiny}
          text={shinyShowState ? "Show Shinies" : "Hide Shinies"}
          styleName="btn-onwhite"
        />
      </div>
      <div className="content-wrapper">
        <div style={{ width: "100%" }}>
          {showFavsOnly && (
            <h1 style={{ textAlign: "center", paddingTop: "50px" }}>
              {favCount === 0 ? "Oops... Nothing to show!" : ""}
            </h1>
          )}
        </div>
        {shownPokemonData.map((individualPokemon) => {
          return (
            <PokemonCard
              key={individualPokemon.name}
              individualPokemon={individualPokemon}
              togglePokeFav={togglePokeFav}
              shinyToggle={shinyToggle}
              updateFavCount={updateFavCount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ContentPage;
