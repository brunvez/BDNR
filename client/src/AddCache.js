import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { SnackbarProvider, useSnackbar } from 'notistack';

const API_URL = 'http://localhost:5000/caches';

function AddCache() {
  const { enqueueSnackbar } = useSnackbar();

  const [key, setKey] = useState('');
  const [timeToLive, setTimeToLive] = useState('');
  const [doNotExpire, setDoNotExpire] = useState(false);
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!key || !content || !(doNotExpire || timeToLive)) {
      return;
    }

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key,
        timeToLive,
        doNotExpire,
        content
      })
    })
      .then(console.log)
      .then(() => enqueueSnackbar('Cache added'))
      .catch(console.error);
  };

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Add cache
      </Typography>
      <TextField
        fullWidth={true}
        label="Key"
        onChange={({ target }) => setKey(target.value)}
        margin="normal"
      />
      <TextField
        fullWidth={true}
        label="Time to Live (in seconds)"
        type="number"
        onChange={({ target }) => setTimeToLive(target.value)}
        margin="normal"
      />
      <div>
        <Checkbox onChange={({ target }) => setDoNotExpire(target.checked)}/>
        Do not expire
      </div>
      <TextField
        placeholder="Content"
        onChange={({ target }) => setContent(target.value)}
        multiline
        fullWidth
        rows={4}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
      >
        Submit
      </Button>
    </React.Fragment>
  )
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AddCache />
    </SnackbarProvider>
  );
}
