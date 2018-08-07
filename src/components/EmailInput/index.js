import React, { Component } from 'react';
import './index.css';
import SearchResults from '../SearchResults';

const SEARCH_RESULTS = {
  users: [
    {
      id: "test_id",
      email: "test@gmail.com",
      firstName: "First Name",
      lastName: "Last Name",
    },
    {
      id: "test_id",
      email: "sample@trunkclub.com",
      firstName: "First Name",
      lastName: "Last Name",
    },
    {
      id: "test_id",
      email: "alexander@gmail.com",
      firstName: "First Name",
      lastName: "Last Name",
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

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.resetState = this.resetState.bind(this);
  };

  onEmailChange(e) {
    const { value } = this.state;

    this.setState({ value: e.target.value });

    if (e.target.value && !e.target.value.endsWith(' ')) {
      this.setState({ search_results: SEARCH_RESULTS });
    } else {
      this.setState({ search_results: null, user_selection: -1 });
    }

    // Reset results if field is cleared
    if (!e.target.value) {
      this.setState({
        search_results: null,
        user_selection: -1,
      });
    }
  }

  onKeyUp(e) {
    e.preventDefault();
  }

  resetState() {
    this.setState({ search_results: null, user_selection: -1 });
  }

  onKeyDown(e) {
    const { user_selection, search_results } = this.state;

    if (!search_results) {
      return;
    }

    if (e.key === ",") {
      this.resetState();
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

      if (user_selection >= 0) {
        this.setState({
          [e.target.name] : search_results.users[user_selection].email.concat(','),
        });
        this.resetState();
      } else {
        this.resetState();
      }
    }
  }

  render() {
    const { label } = this.props;
    const { value, search_results, user_selection } = this.state;

    return (
      <div className="email-input">
        <label className="email-input-label">{label}</label>
        <input className="email-input-field" type="text"
          value={value} onChange={this.onEmailChange} onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp}/>

        {search_results ? <SearchResults search_results={search_results} userSelection={user_selection} /> : ''}
      </div>
    );
  }
}

export default EmailInput;
