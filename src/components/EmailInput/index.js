import React, { Component } from 'react';
import './index.css';
import SearchResults from '../SearchResults';

const SEARCH_RESULTS = {
  users: [
    {
      id: "1",
      email: "alexander.dpv@gmail.com",
      firstName: "Alexander",
      lastName: "DPV",
    },
    {
      id: "2",
      email: "john.doe@yahoo.com",
      firstName: "John",
      lastName: "Doe",
    },
    {
      id: "3",
      email: "bob.smith@gmail.com",
      firstName: "Bob",
      lastName: "Smith",
    },
  ]
};

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
    this.highlightSection = this.highlightSection.bind(this);
    this.hoverSelection = this.hoverSelection.bind(this);
    this.updateValue = this.updateValue.bind(this);
  };

  clearSearchResults() {
    this.setState({ search_results: null, user_selection: -1 });
  }

  onKeyUp(e) {
    e.preventDefault();
  }

  onKeyDown(e) {
    const { multiple, value } = this.props;
    const { user_selection, search_results } = this.state;

    // TODO: refactor to swtich statement
    if (search_results) {
      if (e.key === "," || e.key === " ") {
        this.clearSearchResults();
      }

      if (e.key === "ArrowUp" && user_selection > -1) {
        e.preventDefault();
        this.setState({ user_selection : user_selection - 1});
      }

      if ((e.key === "ArrowDown" || e.key === "Tab") && user_selection < (search_results.users.length - 1)) {
        e.preventDefault();
        this.setState({ user_selection : user_selection + 1});
      }

      if (e.key === "Enter") {
        e.preventDefault();

        // selection via search results
        if (user_selection >= 0) {
          const emailSelected = search_results.users[user_selection].email;

          if (multiple) {
            let updatedValue = "";

            if (value.includes(",")) {
              updatedValue = value.substring(0, value.lastIndexOf(',') + 1)
                + emailSelected;
            } else {
              updatedValue = emailSelected;
            }

            this.props.callback(e.target.name, updatedValue);
          } else {
            this.props.callback(e.target.name, search_results.users[user_selection].email);
          }
        }

        this.clearSearchResults();
      }
    }
  }

  highlightSection(e, i) {
    this.setState({ user_selection : i });
  }

  hoverSelection(e, i) {
    const { value } = this.state;
    const { multiple } = this.props;

    if (multiple) {
      // append to list of emails
      let updatedValue = value.substring(0, value.lastIndexOf(',') + 1);
      this.setState({
        value : updatedValue + e.target.innerText,
      });
    } else {
      this.setState({ value : e.target.innerText });
    }

    this.clearSearchResults();
  }

  updateValue(e) {
    const { onChange } = this.props;

    if (e.target.value && !e.target.value.trim().endsWith(",")) {
      this.setState({ search_results: SEARCH_RESULTS });
    } else {
      this.clearSearchResults();
    }

    onChange(e);
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
          userSelection={user_selection} highlightSection={this.highlightSection}
          hoverSelection={this.hoverSelection}/> : ''}
      </div>
    );
  }
}

export default EmailInput;
