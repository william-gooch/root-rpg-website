import { Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import character from "api/character";
import React from "react";
import { useHistory } from "react-router-dom";
import { Character } from "root-rpg-model";
import MyCharacterItem from "./MyCharacterItem/MyCharacterItem";

interface MyCharacterListProps {
  newCharacter(): void;
}

const MyCharacterList: React.FC<MyCharacterListProps> = props => {
  const [characters, setCharacters] = React.useState<{ [id: string]: Character }>({});
  const history = useHistory();

  const getCharacters = React.useCallback(async () => {
    try {
      const result = await character.my();
      setCharacters(result);
    } catch (err) {
      console.log(err);
    }
  }, []);

  React.useEffect(() => {
    getCharacters();
  }, [getCharacters]);

  const navigateToCharacterPage = React.useCallback(
    (id: string) => {
      if (id) {
        history.push(`/character/${id}`);
      }
    },
    [history]
  );

  const deleteCharacter = React.useCallback(
    async (id: string) => {
      const characterIds: string[] = JSON.parse(localStorage.getItem("myCharacters") ?? "[]");
      const newCharacterIds = characterIds.filter(x => x !== id);
      localStorage.setItem("myCharacters", JSON.stringify(newCharacterIds));

      character.delete(id);
      getCharacters();
    },
    [getCharacters]
  );

  return (
    <Grid item className="my-box">
      <h2>Your Characters</h2>
      <Grid container direction="row" alignItems="stretch">
        {Object.entries(characters ?? {}).map(
          ([id, character]) =>
            character && (
              <MyCharacterItem
                key={id}
                character={character}
                goToCharacter={() => navigateToCharacterPage(id)}
                deleteCharacter={() => deleteCharacter(id)}
              />
            )
        )}
        <Grid item xs={12} md={3} className="new-character-container">
          <div role="button" className="new-character-button" onClick={() => props.newCharacter()}>
            <Grid container direction="column" alignItems="center" justify="center" className="new-character-box">
              <Grid item>
                <Add />
              </Grid>
              <Grid item>New Character</Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(MyCharacterList);
