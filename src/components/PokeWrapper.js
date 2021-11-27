import "../App.css";
import Button from "./Button";
import ContentCard from "./PokemonCard";

const ContentPage = ({ pokeData }) => {
  const bing = false;

  const onClick = () => {
    pokeData(bing);
  };

  return (
    <div className="content-wrapper">
      <h1>Content</h1>
      <ContentCard />
      <Button text="Send up Bing" onClick={onClick} />
    </div>
  );
};

export default ContentPage;
