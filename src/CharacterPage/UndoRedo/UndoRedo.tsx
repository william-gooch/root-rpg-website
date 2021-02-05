import React from "react";
import * as Automerge from "automerge";
import { Redo, Undo } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useCurrentCharacter } from "CharacterProvider";

const UndoRedo: React.FC = () => {
  const [character, changeCharacter, undoCharacter, redoCharacter] = useCurrentCharacter();

  const canUndo = React.useMemo(() => Automerge.canUndo(character), [character]);
  const undo = React.useCallback(() => undoCharacter(), [undoCharacter]);

  const canRedo = React.useMemo(() => Automerge.canRedo(character), [character]);
  const redo = React.useCallback(() => redoCharacter(), [redoCharacter]);

  return (
    <>
      <IconButton disabled={!canUndo} onClick={undo}>
        <Undo />
      </IconButton>
      <IconButton disabled={!canRedo} onClick={redo}>
        <Redo />
      </IconButton>
    </>
  );
};

export default UndoRedo;
