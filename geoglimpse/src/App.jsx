import { React, useState } from "react";
import SearchBar from './components/Searchbar'
import Countries from './components/Countries'
import "./App.css";

function App() {
  return (
    <div className='App'>
       <SearchBar/>

       <div>
        <Countries query="Abuja" />
        </div>
     </div>
  );
}

export default App;