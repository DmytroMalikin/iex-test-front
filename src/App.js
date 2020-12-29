import './App.css';
import SearchSymbol from './components/SearchSymbol';

import React, { Component } from "react";
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>iEX test task</h1>
        <SearchSymbol />
      </div>
    );
  }
}

export default App;
