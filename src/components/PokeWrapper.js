import "./PokeWrapper.css";
import PokemonCard from "./PokemonCard";

const ContentPage = ({ allPokemonData, togglePokeFav }) => {
  return (
    <div>
      <h1>Content</h1>
      <div className="content-wrapper">
        {allPokemonData.map((individualPokemon) => {
          return (
            <PokemonCard
              key={individualPokemon.name}
              individualPokemon={individualPokemon}
              togglePokeFav={togglePokeFav}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ContentPage;
