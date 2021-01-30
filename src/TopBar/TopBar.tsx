import React from "react";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";

import "./TopBar.scss";
import { Home, Menu as MenuIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSocket } from "../SocketProvider";

interface TopBarProps {}

const TopBar: React.FC<TopBarProps> = props => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>();
  const socket = useSocket();

  const createNewCharacter = React.useCallback(() => {
    socket.send(JSON.stringify({ action: "new-document" }));
  }, [socket]);

  return (
    <AppBar position="static" color="inherit" className="top-bar">
      <Toolbar>
        <Link
          to="/"
          component={props => (
            <IconButton edge="start" className="home-button" {...props}>
              <Home />
            </IconButton>
          )}
        />
        <Typography variant="h6" className="fill">
          Root RPG
        </Typography>
        <IconButton
          edge="start"
          onClick={evt => setAnchorEl(evt.currentTarget)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Menu
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        id="main-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={createNewCharacter}>New Character</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default React.memo(TopBar);
