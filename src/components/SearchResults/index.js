import React, { Component } from 'react';
import './index.css';

class SearchResults extends Component {
  render() {
    const { userSelection, search_results, onResultsHover, onResultsClick } = this.props;

    return(
      <div className="search-results">
        <ul>
          {search_results.users.map((user, i) =>
            <li key={i} className={userSelection === i ? 'selected' : ''}
              onMouseOver={(e) => onResultsHover(e, i)} onClick={(e) => onResultsClick(e, i)}>
            {user.email}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default SearchResults;
