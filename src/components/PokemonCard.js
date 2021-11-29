import { useState, useEffect } from "react";
import Button from "./Button";
import "./PokemonCard.css";
import heartBtnClicked from "../assets/heart_btn_clicked.png";
import heartBtnDefault from "../assets/heart_btn_default.png";
import ShinyBtnDefault from "../assets/shiny_btn_default.png";
import ShinyBtnClicked from "../assets/shiny_btn_default.png";

const PokemonCard = ({ individualPokemon, togglePokeFav }) => {
  const [localFav, setLocalFav] = useState([individualPokemon.isFav]);
  var shiny = false;

  const triggerToggleFav = () => {
    togglePokeFav(individualPokemon);
    setLocalFav(!localFav);
  };

  const triggerToggleShiny = () => {
    shiny = !shiny;
    console.log(shiny);
  };

  return (
    <div
      className="poke-div"
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
              src={shiny ? ShinyBtnDefault : ShinyBtnClicked}
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
        src={individualPokemon.sprites.front_default}
        alt={individualPokemon.name}
      />
      <h3 className="poke-name">{individualPokemon.name}</h3>
      <Button
        styleName="btn-default"
        text="PREVIEW SHINY"
        onClick={() => console.log(individualPokemon.isFav)}
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
  );
};

export default PokemonCard;
