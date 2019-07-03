import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SubjectIcon from '@material-ui/icons/Subject';
import MailIcon from '@material-ui/icons/Mail';
import StorageIcon from '@material-ui/icons/Storage';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Description from './Description';
import Messaging from './Messaging';
import Cache from './Cache';

import './Navigation.css';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Description" icon={<SubjectIcon/>}/>
          <Tab label="Messaging" icon={<MailIcon/>}/>
          <Tab label="Cache" icon={<StorageIcon/>}/>
        </Tabs>
      </AppBar>
      <Container maxWidth="md" className="Navigation-container">
        {value === 0 && <Description/>}
        {value === 1 && <Messaging/>}
        {value === 2 && <Cache/>}
      </Container>
    </div>
  );
}