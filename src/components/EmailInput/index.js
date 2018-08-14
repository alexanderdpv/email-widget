import React, { Component } from 'react';
import './index.css';
import SearchResults from '../SearchResults';
import { SEARCH_RESULTS } from '../../constants/index.js';

class EmailInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      search_results: null,
      user_selection: -1,
    }

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.clearSearchResults = this.clearSearchResults.bind(this);
    this.onResultsHover = this.onResultsHover.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.onResultsSelect = this.onResultsSelect.bind(this);
  };

  clearSearchResults() {
    this.setState({ search_results: null, user_selection: -1 });
  }

  onKeyUp(e) {
    e.preventDefault();
  }

  onKeyDown(e) {
    const { user_selection, search_results } = this.state;

    if (search_results) {
      if (e.key === "," || e.key === " ") {
        this.clearSearchResults();
      }

      if (e.key === "ArrowUp" && user_selection > -1) {
        e.preventDefault();
        this.setState({ user_selection : user_selection - 1 });
      }

      if ((e.key === "ArrowDown" || e.key === "Tab") && user_selection < (search_results.users.length - 1)) {
        e.preventDefault();
        this.setState({ user_selection : user_selection + 1 });
      }

      if (e.key === "Enter") {
        e.preventDefault();

        if (user_selection >= 0) {
          this.onResultsSelect();
        } else {
          this.updateValue(e);
          this.clearSearchResults();
        }
      }
    }
  }

  onResultsHover(e, i) {
    this.setState({ user_selection : i });
  }

  onResultsSelect() {
    const { callback, multiple, name, value } = this.props;
    const { user_selection, search_results } = this.state;

    // Create a list for inputs that allow multiple emails
    // Set input value to single email for inputs that don't allow multiple
    if (multiple && value.includes(",") && user_selection >= 0) {
      const emailSelected = search_results.users[user_selection].email;
      let updatedValue = value.substring(0, value.lastIndexOf(',') + 1) + emailSelected.concat(",");

      callback(name, updatedValue);
    } else {
      callback(name, search_results.users[user_selection].email);
    }
    this.clearSearchResults();
  }

  updateValue(e) {
    const { callback, name } = this.props;

    if (e.target.value && !e.target.value.trim().endsWith(",")) {
      this.setState({ search_results: SEARCH_RESULTS });
    } else {
      this.clearSearchResults();
    }

    // Passes value to the parent component
    callback(name, e.target.value);
  }

  render() {
    const { label, name, multiple, required, value } = this.props;
    const { search_results, user_selection } = this.state;

    return (
      <div className="email-input">
        <label className="email-input-label">{label}</label>
        <input className="email-input-field" type="text" name={name} value={value} multiple={multiple} required={required}
          onChange={this.updateValue} onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp}/>

        {search_results ? <SearchResults search_results={search_results}
          userSelection={user_selection} onResultsHover={this.onResultsHover}
          onResultsClick={this.onResultsSelect}/> : ''}
      </div>
    );
  }
}

export default EmailInput;
