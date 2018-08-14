import React, { Component } from 'react';
import './index.css';

class EmailStatus extends Component {
  render() {
    const { status, message } = this.props;
    const classes = `${status} email-status`;

    return(
      <div className={classes}>
        <span className="email-status-message">{message}</span>
      </div>
    )
  }
}

export default EmailStatus;
