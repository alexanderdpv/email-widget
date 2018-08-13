import React, { Component } from 'react';
import './index.css';
import SearchResults from '../SearchResults';

const SEARCH_RESULTS = {
  users: [
    {
      id: "1000",
      email: "alexander.dpv@gmail.com",
      firstName: "Alexander",
      lastName: "DPV",
    },
    {
      id: "1001",
      email: "john.doe@yahoo.com",
      firstName: "John",
      lastName: "Doe",
    },
    {
      id: "1002",
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
      search: false,
    }

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.resetState = this.resetState.bind(this);
    this.highlightSection = this.highlightSection.bind(this);
    this.hoverSelection = this.hoverSelection.bind(this);
    this.getValue = this.getValue.bind(this);
  };

  onEmailChange(e) {
    this.setState({ value : e.target.value });

    if (e.target.value && !e.target.value.trim().endsWith(",")) {
      this.setState({ search_results: SEARCH_RESULTS });
    } else {
      this.resetState();
    }

    // Reset results if field is cleared
    if (!e.target.value) {
      this.resetState();
    }
  }

  onKeyUp(e) {
    e.preventDefault();
  }

  resetState() {
    this.setState({ search_results: null, user_selection: -1 });
  }

  onKeyDown(e) {
    const { multiple } = this.props;
    const { user_selection, search_results, value } = this.state;

    if (e.key === "," || e.key === " ") {
      this.resetState();
    }

    if (search_results) {
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
          if (multiple) {
            let updatedValue = value.substring(0, value.lastIndexOf(',') + 1);
            this.setState({
              value : updatedValue + search_results.users[user_selection].email,
            });
          } else {
            this.setState({
              value : search_results.users[user_selection].email,
            });
          }
        }

        this.resetState();
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

    this.resetState();
  }

  getValue() {
    const { multiple } = this.props;
    const { value } = this.state;

    if (multiple) {
      const array_value = value.split(",").map(email => email.trim()).filter(Boolean);
      return array_value;
    }
    return value;
  }

  clearValue() {
    this.setState({ value: "" });
  }

  render() {
    const { label, name, multiple, required } = this.props;
    const { value, search_results, user_selection } = this.state;

    return (
      <div className="email-input">
        <label className="email-input-label">{label}</label>
        <input className="email-input-field" type="text" name={name} value={value} multiple={multiple} required={required}
          onChange={this.onEmailChange} onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp}/>

        {search_results ? <SearchResults search_results={search_results}
          userSelection={user_selection} highlightSection={this.highlightSection}
          hoverSelection={this.hoverSelection}/> : ''}
      </div>
    );
  }
}

export default EmailInput;
