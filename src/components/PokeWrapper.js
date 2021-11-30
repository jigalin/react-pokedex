import { useState, useEffect } from "react";
import "./PokeWrapper.css";
import PokemonCard from "./PokemonCard";
import Button from "./Button";
import CoolSearchBar from "./CoolSearchBar";
import PokemonViewerLogo from "../assets/PokemonViewer.png";

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
  const [enteredVar, setEnteredVar] = useState(true);

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

  const searchFunc = (input) => {
    let value = input;
    let result = [];
    result = allPokemonData.filter((data) => {
      return data.name.search(value) !== -1;
    });
    setShownPokemonData(result);
  };

  const resetPokeData = () => {
    setShownPokemonData(allPokemonData);
  };

  // BELOW: Working Logic for sorting by types, left out for a later stage

  // const showFireFunc = () => {
  //   if (showFireOnly === false) {
  //     let fire = [];
  //     fire = shownPokemonData.filter((data) => {
  //       return data.types[0].type.name === "fire";
  //     });
  //     setShownPokemonData(fire);
  //     setShowFireOnly(true);
  //   } else {
  //     setShownPokemonData(allPokemonData);
  //     setShowFireOnly(false);
  //   }
  // };

  const enter = () => {
    setEnteredVar(false);
  };

  return (
    <div style={{ minHeight: "800px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "45px",
          paddingTop: "20px",
          paddingBottom: "40px",
          alignItems: "center",
          alignContent: "flex-start",
          transition: "opacity 2s",
          opacity: enteredVar ? "0.1" : "1",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={PokemonViewerLogo}
            style={{
              height: "100px",
              paddingRight: "30px",
            }}
            alt="Pokemon Viewer Logo"
          />
          <Button
            onClick={showFavsFunc}
            text={showFavsOnly ? "Hide Faves" : "Show Faves"}
            styleName="btn-onwhite"
          />
          <Button
            onClick={showAllShiny}
            text={shinyShowState ? "Show Shinies" : "Hide Shinies"}
            styleName="btn-onwhite"
          />
        </div>
        <div>
          <CoolSearchBar
            searchFunc={searchFunc}
            resetPokeData={resetPokeData}
          />
        </div>
      </div>
      <div className="content-wrapper">
        <div
          style={{
            width: "100%",
            display: "flex",
            position: "absolute",
            margin: "auto",
            top: 0,
            justifyContent: "center",
            paddingTop: "470px",
            zIndex: enteredVar ? 2 : -1,
          }}
        >
          <div>
            <Button
              onClick={enter}
              text="Enter Pokemon Viewer"
              styleName="btn-enter"
            ></Button>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          {showFavsOnly && (
            <h1
              style={{
                textAlign: "center",
                paddingTop: "50px",
                paddingBottom: "50px",
              }}
            >
              {favCount === 0 ? "Oops... You have no favourited Pokemon!" : ""}
            </h1>
          )}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignContent: "flex-start",
            flexWrap: "wrap",
            justifyContent: "center",
            paddingLeft: "20px",
            paddingRight: "20px",
            transition: "opacity 2s",
            opacity: enteredVar ? "0.1" : "1",
          }}
        >
          {shownPokemonData.map((individualPokemon) => {
            return (
              <PokemonCard
                key={individualPokemon.name}
                individualPokemon={individualPokemon}
                togglePokeFav={togglePokeFav}
                shinyToggle={shinyToggle}
                updateFavCount={updateFavCount}
                enteredVar={enteredVar}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
