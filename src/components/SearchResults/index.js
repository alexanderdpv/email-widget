import React, { Component } from 'react';
import './index.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class SearchResults extends Component {
  render() {
    const { userSelection, search_results, onResultsHover, onResultsClick } = this.props;

    return(
      <div>
        <Paper elevation={2}>
          <ul>
            {search_results.users.map((user, i) =>
              <li key={i} className="search-results-email">
                <Typography className={userSelection === i ? 'selected' : ''}
                  onMouseOver={(e) => onResultsHover(e, i)} onClick={(e) => onResultsClick(e, i)}>
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
