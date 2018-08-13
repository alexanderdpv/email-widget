import React, { Component } from 'react';
import './index.css';
import {
  PATH_BASE,
  PATH_SUBMIT,
} from '../../constants/index.js';
import axios from 'axios';
import EmailInput from '../EmailInput';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      to: "",
      cc: [],
      subject: "",
      body: "",
      openNotification: false,
      email_status: "",
      validForm: true,
    }

    this.sendEmail = this.sendEmail.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.clearFormFields = this.clearFormFields.bind(this);
  };

  onTextChange(e) {
    this.setState({ [e.target.name] : e.target.value});
  }

  sendEmail(e) {
    e.preventDefault();
    const { subject, body } = this.state;

    // TODO: Get value for autocomplete input fields
    this.setState({
      to: this.toInputField.getValue(),
      cc: this.ccInputField.getValue(),
    });

    axios.post(`${PATH_BASE}${PATH_SUBMIT}`, { to: this.toInputField.getValue(), cc: this.ccInputField.getValue(), subject, body })
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
      cc: [],
      subject: "",
      body: "",
    });

    this.toInputField.clearValue();
    this.ccInputField.clearValue();
  }

  render() {
    const { subject, body, email_status, validForm } = this.state;

    return (
      <div className="App">
        <form name="emailForm" onSubmit={this.sendEmail}>
          <EmailInput label="To: " name="to" required={true} multiple={false} ref={node => this.toInputField = node}/>
          <EmailInput label="CC: " name="cc" required={false} multiple={true} ref={node => this.ccInputField = node}/>

          <label className="input-label">Subject: </label>
          <input type="text" name="subject" value={subject} onChange={this.onTextChange} required/>

          <textarea name="body" value={body} onChange={this.onTextChange} required/>
          <Button type="submit" variant="contained" color="primary" disabled={!validForm}>Send</Button>
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
