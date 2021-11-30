import { useState, useEffect } from "react";
import Button from "./Button";
import "./PokemonCard.css";
import heartBtnClicked from "../assets/heart_btn_clicked.png";
import heartBtnDefault from "../assets/heart_btn_default.png";
import ShinyBtnDefault from "../assets/shiny_btn_default.png";
import ShinyBtnClicked from "../assets/shiny_btn_clicked.png";

const PokemonCard = ({
  individualPokemon,
  togglePokeFav,
  shinyToggle,
  updateFavCount,
  enteredVar,
}) => {
  const [localFav, setLocalFav] = useState([individualPokemon.isFav]);
  const [localShinyShown, setLocalShinyShown] = useState([
    individualPokemon.shinyShown,
  ]);
  const [pokeImg, setPokeImg] = useState(
    individualPokemon.sprites.front_default
  );
  const [shinyImg, setShinyImg] = useState(
    individualPokemon.sprites.front_shiny
  );
  const [typeVar, setTypeVar] = useState();

  useEffect(() => {
    initTypeData();
    // eslint-disable-next-line
  }, [individualPokemon]);

  const initTypeData = () => {
    setTypeVar(individualPokemon.types[0].type.name);
  };

  const triggerToggleFav = () => {
    togglePokeFav(individualPokemon);
    setLocalFav(!localFav);
    updateFavCount(localFav ? 1 : -1);
  };

  const triggerToggleShiny = () => {
    shinyToggle(individualPokemon);
    setLocalShinyShown(!localShinyShown);
  };

  const showBack = () => {
    if (individualPokemon.sprites.front_default === pokeImg) {
      setPokeImg(individualPokemon.sprites.back_default);
      setShinyImg(individualPokemon.sprites.back_shiny);
    } else {
      setPokeImg(individualPokemon.sprites.front_default);
      setShinyImg(individualPokemon.sprites.front_shiny);
    }
  };

  return (
    <div>
      <div
        className={typeVar}
        style={{
          zIndex: 0,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            position: "absolute",
            top: 0,
            justifyContent: "space-between",
          }}
        >
          <div style={{}}>
            <button className="btn-small">
              <img
                className="btn-small-img"
                src={
                  individualPokemon.shinyShown
                    ? ShinyBtnClicked
                    : ShinyBtnDefault
                }
                alt="heart"
                onClick={triggerToggleShiny}
              />
            </button>
          </div>
          <div style={{}}>
            <button className="btn-small">
              <img
                className="btn-small-img"
                src={localFav ? heartBtnDefault : heartBtnClicked}
                alt="heart"
                onClick={triggerToggleFav}
              />
            </button>
          </div>
        </div>
        <img
          className="poke-img"
          src={individualPokemon.shinyShown ? shinyImg : pokeImg}
          alt={individualPokemon.name}
        />
        <h3 className="poke-name">{individualPokemon.name}</h3>
        <Button
          styleName="btn-default"
          text={
            individualPokemon.sprites.front_default === pokeImg
              ? "VIEW BACK"
              : "VIEW FRONT"
          }
          onClick={showBack}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            position: "absolute",
            bottom: 0,
            justifyContent: "space-between",
            zIndex: -1,
          }}
        >
          <div className="poke-bottom-card"></div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
