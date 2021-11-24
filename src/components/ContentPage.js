import "../App.css";
import Button from "./Button";
import ContentCard from "./ContentCard";

const ContentPage = ({ pokeData }) => {
  const bing = true;

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
