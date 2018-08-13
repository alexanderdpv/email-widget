import React, { Component } from 'react';
import './index.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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

class SearchResults extends Component {
  render() {
    const { userSelection, search_results, highlightSection, hoverSelection } = this.props;

    return(
      <div>
        <Paper elevation={2}>
          <ul>
            {search_results.users.map((user, i) =>
              <li key={i} className="search-results-email">
                <Typography className={userSelection === i ? 'selected' : ''}
                  onMouseOver={(e) => highlightSection(e, i)} onClick={(e) => hoverSelection(e, i)}>
                  {user.email}
                </Typography>
              </li>
            )}
          </ul>
        </Paper>
      </div>
    )
  }
}

export default SearchResults;
