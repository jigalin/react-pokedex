import Button from "./Button";
import "../App.css";

const ContentCard = () => {
  const onClicked = () => {};
  return (
    <div>
      <h3>Pokemon Name</h3>
      <p>Pokemon Type</p>
      <img alt=""></img>
      <Button color="blue" text="ButtonText" onClick={onClicked} />
    </div>
  );
};

export default ContentCard;
