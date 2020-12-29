import React, { Component } from "react";
import { BASE_URL } from "../api"

export class SearchSymbol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      input: "",
      currentSymbol: {}
    };
  }

  onChange = e => {
    const userInput = e.currentTarget.value;

    const filteredSuggestions = this.state.suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      suggestions: this.state.suggestions,
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      input: e.currentTarget.value,
      currentSymbol: {}
    });
  };

  onClick = e => {
    this.setState({
      suggestions: this.state.suggestions,
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      input: e.currentTarget.innerText,
      currentSymbol: {}
    });
  };

  onSubmit = () => {
    const symbol = this.state.input;
    const url = `${BASE_URL}/symbols/${symbol}`;

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            currentSymbol: result
          });
        }
      )
  };

  componentDidMount() {
    const url = `${BASE_URL}/symbols/autocomplete`;

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            suggestions: result.data
          });
        }
      )
  };

  render() {
    const {
      onChange,
      onClick,
      onSubmit,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        input,
        currentSymbol
      }
    } = this;
    let suggestionsListComponent;
    if (showSuggestions && input) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions</em>
          </div>
        );
      }
    }
    
    let symbolInfo = [];
    for (let prop in currentSymbol) {
        if (currentSymbol.hasOwnProperty(prop)) {
          symbolInfo.push(<li key={prop}>{prop}: {currentSymbol[prop]}</li>)
        }
      };
    let symbolInfoComponent = (
        <div>
            {symbolInfo}
        </div>
        )

    return (
      <React.Fragment>
        <input
          type="text"
          onChange={onChange}
          onSubmit={onSubmit}
          value={input}
        />
        <button onClick={onSubmit}>
            Search
        </button>
        {symbolInfoComponent}
        {suggestionsListComponent}
      </React.Fragment>
    );
  }
}

export default SearchSymbol;