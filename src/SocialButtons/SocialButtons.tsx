import React from "react";
import { Grid, Hidden, IconButton } from "@material-ui/core";
import "./SocialButtons.scss";
import { ChevronLeft, Close } from "@material-ui/icons";

const SocialButtons: React.FC = props => {
  const [shown, setShown] = React.useState(true);

  return (
    <Grid
      container
      direction="row"
      alignItems="flex-end"
      wrap="nowrap"
      className={"floater-container" + (shown ? "" : " hidden")}
    >
      <Grid item container direction="row" wrap="nowrap" className="copyright">
        <Grid item className="close-button">
          <IconButton size="small" onClick={() => setShown(!shown)}>
            {shown ? <Close /> : <ChevronLeft />}
          </IconButton>
        </Grid>
        <Grid item container direction="column">
          <Grid item>Made by William Gooch</Grid>
          <Grid item>Root: The Tabletop Roleplaying Game &copy; Magpie Games 2021</Grid>
        </Grid>
      </Grid>
      <Hidden xsDown>
        <Grid item container direction="row" className="social-buttons">
          <Grid item className="kofi-button">
            <a href="https://ko-fi.com/woochy" target="_blank">
              <img
                height="36"
                style={{ border: 0, height: "36px" }}
                src="https://cdn.ko-fi.com/cdn/kofi2.png?v=2"
                alt="Buy me a Coffee at ko-fi.com"
              />
            </a>
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default React.memo(SocialButtons);
