import React from "react";
import { Grid } from "@material-ui/core";
import "./SocialButtons.scss";

const SocialButtons: React.FC = props => {
  return (
    <Grid container direction="row" className="social-buttons">
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
  );
};

export default React.memo(SocialButtons);
