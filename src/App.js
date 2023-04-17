import { useState, useEffect } from "react";
import CardList from "./components/card-list/cardlist.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [title, setTitle] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    console.log("effect fired");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };
  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setTitle(searchFieldString);
  };

  return (
    <div>
      <h1 className="app-title">{title}</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        className="monsters-search-box"
        placeholder="search monsters"
      />
      <br />
      <SearchBox
        onChangeHandler={onTitleChange}
        className="title-search-box"
        placeholder="search title"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
