import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AdminIcon from '@material-ui/icons/Work';
import SettingsIcon from '@material-ui/icons/Build';
import StateIcon from '@material-ui/icons/TrendingUpRounded';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function Navigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction component={Link} to="/" label="Admin" icon={<AdminIcon />} />
      <BottomNavigationAction component={Link} to="/Settings" label="Settings" icon={<SettingsIcon />} />
      <BottomNavigationAction component={Link} to="/State" label="State" icon={<StateIcon />} />
    </BottomNavigation>
  );
}
