import React from "react";
import {
  AppBar,
  IconButton,
  MenuItem,
  MenuList,
  Popover,
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
        <IconButton className="home-button" component={Link} to="/">
          <Home />
        </IconButton>
        <Typography variant="h6" className="fill">
          Root RPG
        </Typography>
        {props.children}
        <IconButton
          edge="start"
          onClick={evt => setAnchorEl(evt.currentTarget)}
          style={{ marginLeft: "0.5vw" }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Popover
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
      >
        <MenuList id="main-menu">
          <MenuItem onClick={createNewCharacter}>New Character</MenuItem>
        </MenuList>
      </Popover>
    </AppBar>
  );
};

export default React.memo(TopBar);
