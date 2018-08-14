import React, { Component } from 'react';
import './index.css';
import {
  PATH_BASE,
  PATH_SUBMIT,
} from '../../constants/index.js';
import axios from 'axios';
import EmailInput from '../EmailInput';
import Snackbar from '@material-ui/core/Snackbar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      to: "",
      cc: "",
      subject: "",
      body: "",
      openNotification: false,
      email_status: "",
      validForm: false,
    }

    this.sendEmail = this.sendEmail.bind(this);
    this.clearFormFields = this.clearFormFields.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
  };

  sendEmail(e) {
    e.preventDefault();
    const { to, cc, subject, body } = this.state;
    const ccArray = cc.split(",").map(email => email.trim()).filter(Boolean);

    axios.post(`${PATH_BASE}${PATH_SUBMIT}`, { to, cc: ccArray, subject, body })
      .then(response => {
        switch(response.status) {
          case 200:
            this.setState({ email_status: "Email successfully sent"});
            this.clearFormFields();
            break;
          default:
            break;
        };

        this.setState({ openNotification : true });
      })
      .catch(error => {
        switch(error.response.status) {
          case 400:
            this.setState({ email_status: "Invalid input"});
            break;
          case 500:
            this.setState({ email_status: "Error occurred – resubmit email"});
            break;
          default:
            break;
        };

        this.setState({ openNotification : true });
      });
  }

  clearFormFields() {
    this.setState({
      to: "",
      cc: "",
      subject: "",
      body: "",
    });
  }

  callbackChild = (key, data) => {
    this.setState({ [key]: data });
    this.validateFields();
  };

  onEmailChange(e) {
    this.setState({ [e.target.name] : e.target.value });
    this.validateFields();
  }

  validateFields() {
    const { to, subject, body } = this.state;

    if (!to || !subject || !body) {
      this.setState({ validForm: false });
    } else {
      this.setState({ validForm: true });
    }
  }

  render() {
    const { to, cc, subject, body, email_status, validForm } = this.state;

    return (
      <div className="App">
        <form name="emailForm" onSubmit={this.sendEmail}>
          <EmailInput label="To: " name="to" value={to} onChange={this.onEmailChange} callback={this.callbackChild} required={true} multiple={false} ref={node => this.toInputField = node}/>
          <EmailInput label="CC: " name="cc" value={cc} onChange={this.onEmailChange} callback={this.callbackChild} required={false} multiple={true} ref={node => this.ccInputField = node}/>

          <label className="input-label">Subject: </label>
          <input type="text" name="subject" value={subject} onChange={this.onEmailChange} required/>

          <textarea name="body" value={body} onChange={this.onEmailChange} required/>
          <button type="submit" disabled={!validForm}>Send</button>
        </form>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openNotification}
          autoHideDuration={6000}
          message={email_status}
          onClose={() => {this.setState({openNotification: false})}}
        />
      </div>
    );
  }
}

export default App;
