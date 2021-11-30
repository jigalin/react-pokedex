import React from "react";
import "./PokeSearch.css";

const PokeSearch = ({ onSearchbarChange }) => {
  const searchChange2 = (e) => {
    console.log(e);
  };
  return (
    <div>
      <form className="search-pokemon">
        <label htmlFor="pokename"></label>
        <input
          type="text"
          id="pokename"
          name="pokename"
          value="Start typing a pokemon..."
          onChange={(e) => searchChange2(e)}
        ></input>
      </form>
    </div>
  );
};

export default PokeSearch;
