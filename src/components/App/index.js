import React, { Component } from 'react';
import './index.css';
import {
  PATH_BASE,
  PATH_SUBMIT,
} from '../../constants/index.js';
import axios from 'axios';
import EmailInput from '../EmailInput';
import EmailStatus from '../EmailStatus';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      to: "",
      cc: "",
      subject: "",
      body: "",
      openNotification: true,
      emailStatusMessage: "",
      emailStatus: "",
      validForm: false,
    }

    this.sendEmail = this.sendEmail.bind(this);
    this.resetForm = this.resetForm.bind(this);
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
            this.setState({
              emailStatusMessage: "Email successfully sent",
              emailStatus: "success",
              openNotification : true,
            });
            this.resetForm();
            break;
          default:
            break;
        };
      })
      .catch(error => {
        switch(error.response.status) {
          case 400:
            this.setState({ emailStatusMessage: "Invalid input", emailStatus: "invalid"});
            break;
          case 500:
            this.setState({ emailStatusMessage: "Error occurred – resubmit email", emailStatus: "error"});
            break;
          default:
            break;
        };

        this.setState({ openNotification : true });
      });
  }

  resetForm() {
    this.setState({
      to: "",
      cc: "",
      subject: "",
      body: "",
      validForm: false,
    });
  }

  onValueUpdate = (key, data) => {
    this.setState({ [key]: data });
    this.validateFields();
  };

  validateFields() {
    const { to, subject, body } = this.state;

    if (!to || !subject || !body) {
      this.setState({ validForm: false });
    } else {
      this.setState({ validForm: true });
    }
  }

  onEmailChange(e) {
    this.setState({ [e.target.name] : e.target.value });
    this.validateFields();
  }

  render() {
    const { to, cc, subject, body, emailStatusMessage, validForm, openNotification, emailStatus } = this.state;

    return (
      <div className="App">
        <form className="email-form" name="emailForm" onSubmit={this.sendEmail}>
          <EmailInput label="To" name="to" value={to} onValueUpdate={this.onValueUpdate} required={true} multiple={false}/>
          <EmailInput label="CC" name="cc" value={cc} onValueUpdate={this.onValueUpdate} required={false} multiple={true}/>

          <input type="text" name="subject" placeholder="Subject" value={subject} onChange={this.onEmailChange} required/>

          <textarea name="body" value={body} onChange={this.onEmailChange} required/>
          <button type="submit" disabled={!validForm}>Send</button>
        </form>

        {openNotification ? <EmailStatus status={emailStatus} message={emailStatusMessage}/> : ''}
      </div>
    );
  }
}

export default App;
