import React, { Component } from 'react';
import './index.css';
import {
  PATH_BASE,
  PATH_SUBMIT,
} from '../../constants/index.js';
import axios from 'axios';
import EmailInput from '../EmailInput';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      to: "",
      cc: [],
      subject: "",
      body: "",
      message: [],
    }

    this.sendEmail = this.sendEmail.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  };

  onTextChange(e) {
    this.setState({ [e.target.name] : e.target.value});
  }

  sendEmail(e) {
    e.preventDefault();
    const { to, cc, subject, body } = this.state;

    axios.post(`${PATH_BASE}${PATH_SUBMIT}`, { to, cc, subject, body })
      .then(result => console.log(result))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { to, cc, subject, body, search_results, user_selection } = this.state;

    return (
      <div className="App">
        <form name="emailForm" onSubmit={this.sendEmail}>

          <EmailInput label="To: " name="to" required={true}/>
          <EmailInput label="CC: " name="cc"/>

          <label>Subject: </label>
          <input type="text" name="subject" value={subject} onChange={this.onTextChange}/>

          <textarea name="body" value={body} onChange={this.onTextChange}/>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default App;
