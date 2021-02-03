import { Button, Dialog, Grid } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import vagabonds from "assets/vagabonds/vagabonds";
import React from "react";
import { playbooks } from "root-rpg-model";

import "./PlaybookPopup.scss";

interface PlaybookPopupProps {
  open: boolean;
  onClose(): void;
  onSubmit(playbook: keyof typeof playbooks): void;
}

const PlaybookPopup: React.FC<PlaybookPopupProps> = props => {
  const [selected, setSelected] = React.useState<keyof typeof playbooks | undefined>();

  return (
    <Dialog open={props.open} onClose={props.onClose} className="playbook-popup">
      <Grid container direction="column" wrap="nowrap" className="playbook-container">
        <Grid item className="playbook-title">
          Choose a Playbook
        </Grid>
        <Grid item container direction="row" className="playbook-list">
          {Object.entries(playbooks).map(([k, v]) => (
            <Grid
              role="button"
              item
              xs={12}
              sm={6}
              md={3}
              className="playbook-option"
              onClick={() => setSelected(k as keyof typeof playbooks)}
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                className={"playbook-box" + (selected === k ? " selected" : "")}
              >
                <div className="playbook-image">
                  <div className="playbook-image-box">
                    <img src={vagabonds[v.id]} />
                  </div>
                </div>
                <Grid item className="playbook-name">
                  {v.name}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item container direction="row" justify="flex-end" className="playbook-actions">
          <Button
            variant="contained"
            color="secondary"
            disabled={!selected}
            onClick={() => props.onSubmit(selected ?? "arbiter")}
          >
            Create <ChevronRight />
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default PlaybookPopup;
