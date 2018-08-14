import React, { Component } from 'react';
import './index.css';

class EmailStatus extends Component {
  render() {
    const { message } = this.props;

    return(
      <div className="email-status">
        <span>{message}</span>
      </div>
    )
  }
}

export default EmailStatus;
