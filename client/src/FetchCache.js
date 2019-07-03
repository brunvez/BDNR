import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const API_URL = 'http://localhost:5000/caches';

export default function FetchCache() {

  const [key, setKey] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!key) {
      return;
    }

    fetch(`${API_URL}/${key}`)
      .then(response => response.text())
      .then(content => content || 'Key not found')
      .then(setContent)
      .catch(console.error);
  };

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Fetch cache
      </Typography>
      <TextField
        fullWidth={true}
        label="Key"
        onChange={({ target }) => setKey(target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
      >
        Get
      </Button>
      <Paper className="fetched-content" style={{ display: (content === '' ? 'none' : 'inherit') }}>
        <Typography variant="body1" gutterBottom>
          {content}
        </Typography>
      </Paper>
    </React.Fragment>
  )
}