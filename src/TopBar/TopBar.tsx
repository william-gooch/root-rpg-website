import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";

import "./TopBar.scss";
import { Home } from "@material-ui/icons";
import { Link } from "react-router-dom";

interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = props => {
  return React.useMemo(
    () => (
      <AppBar position="static" color="inherit" className="top-bar">
        <Toolbar>
          <IconButton className="home-button" component={Link} to="/">
            <Home />
          </IconButton>
          <Typography variant="h6" className="fill">
            Root RPG
          </Typography>
          {props.children}
        </Toolbar>
      </AppBar>
    ),
    [props.children]
  );
};

export default React.memo(TopBar);
