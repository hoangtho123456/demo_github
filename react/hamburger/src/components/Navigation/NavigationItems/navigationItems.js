import React from 'react';
import classes from './navigationItems.css';
import NavigationItem from './NavigationItem/navigationItem';
const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {props.isAuthenticated ?<NavigationItem link="/orders">Orders</NavigationItem>:null}
    {!props.isAuthenticated ?
      <NavigationItem link="/auth">Authentication</NavigationItem>:
      <NavigationItem link="/logout">Logout</NavigationItem>
    }
  </ul>
);

export default navigationItems;
