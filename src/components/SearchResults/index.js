import React, { Component } from 'react';
import './index.css';

class SearchResults extends Component {
  render() {
    const { userSelection, search_results, highlightSection } = this.props;

    return(
      <div className="search-results">
        <ul>
          { search_results.users.map((user, i) =>
            <li className="search-results-email" key={i} className={userSelection === i ? 'selected' : ''}
              onMouseOver={(e) => highlightSection(e, i)}>
              {user.email}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default SearchResults;
