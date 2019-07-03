import React from 'react';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


import './Messaging.css'

const API_URL = 'http://localhost:5000/messages';
const WEBSOCKET_URL = 'ws://localhost:5000/messages';

class Messaging extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      json: null,
      socket: null,
      messages: []
    };

    this.saveJson = this.saveJson.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.getMessages();
    const socket = new WebSocket(WEBSOCKET_URL);
    this.setState({ socket });
    socket.onmessage = ({ data }) => {
      const message = JSON.parse(data);
      this.setState(({ messages }) => {
        return {
          messages: [message].concat(messages)
        };
      })
    };
    socket.onerror = console.error;
  }

  componentWillUnmount() {
    const { socket } = this.state;
    if (socket) {
      socket.close();
    }
  }

  getMessages() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((apiMessages) => {
        this.setState(({ messages }) => ({ messages: messages.concat(apiMessages) }));
      })
      .catch(console.error);
  }

  saveJson(json) {
    this.setState({ json });
  }

  submit() {
    const { json: message } = this.state;
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    }).then(console.log)
      .catch(console.error);
  }

  renderMessage() {
    const { messages } = this.state;
    return messages.map((message, i) => {
      return (
        <Paper key={i} elevation={3} className="Messaging-message">
          <pre>
            {JSON.stringify(message, null, 2)}
          </pre>
        </Paper>
      )
    })
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h4" gutterBottom>
          Messaging
        </Typography>
        <div
          className="Messaging-editor"
        >
          <Editor
            value={{}}
            onChange={this.saveJson}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.submit}
          >
            Submit
          </Button>
        </div>

        <div>
          {this.renderMessage()}
        </div>
      </React.Fragment>
    )
  }
}

export default Messaging;
