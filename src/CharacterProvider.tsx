import React from "react";
import * as Automerge from "automerge";
import { Character } from "root-rpg-model";

// @ts-ignore
import AutomergeClient from "./automerge/client";
import { useRouteMatch } from "react-router-dom";
import { useSocket } from "./SocketProvider";
import { Map } from "immutable";

interface CharacterContextType {
  getCharacters: (
    ids: string[]
  ) => { [id: string]: Automerge.Doc<Character> | undefined } | undefined;
  changeCharacter: (id: string, fn: Automerge.ChangeFn<Character>) => void;
}
const CharacterContext = React.createContext<CharacterContextType>(null as any);

const characterReducer = (
  state: Map<string, Automerge.Doc<Character>>,
  action: any
) => {
  return state.set(action.id, action.doc);
};

export const CharacterProvider: React.FC = props => {
  const [automergeClient, setAutomergeClient] = React.useState<any>();
  const [characters, dispatch] = React.useReducer(
    characterReducer,
    Map<string, Automerge.Doc<Character>>()
  );
  const socket = useSocket();

  React.useEffect(() => {
    if (!socket) return;

    const automergeClient = new AutomergeClient({
      socket,
      savedData: localStorage.getItem("automerge") ?? undefined,
      save: (data: string) => {
        localStorage.setItem("automerge", data);
      },
      onChange: (id: string, doc: Automerge.Doc<Character>) => {
        dispatch({ id, doc });
      },
    });

    setAutomergeClient(automergeClient);
  }, [socket]);

  const getCharacters = React.useCallback(
    (ids: string[]) => {
      if (automergeClient) {
        const toSubscribe: string[] = [];
        const chars = Object.fromEntries(
          ids.map(id => {
            const char = characters.get(id);
            if (!char) {
              toSubscribe.push(id);
              return [id, undefined];
            }
            return [id, char];
          })
        );
        if (toSubscribe.length > 0) automergeClient.subscribe(toSubscribe);
        return chars;
      } else {
        return undefined;
      }
    },
    [automergeClient, characters]
  );

  const changeCharacter = React.useCallback(
    (id: string, fn: Automerge.ChangeFn<Character>) => {
      automergeClient.change(id, fn);
    },
    [automergeClient]
  );

  return (
    <CharacterContext.Provider value={{ getCharacters, changeCharacter }}>
      {props.children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = (): CharacterContextType =>
  React.useContext(CharacterContext);

export const useCharacter = (
  id: string
): [Automerge.Doc<Character>, (fn: Automerge.ChangeFn<Character>) => void] => {
  const characterContext = useCharacterContext();

  const character = characterContext.getCharacters([id])?.[id];
  const changeCharacter = (fn: Automerge.ChangeFn<Character>) =>
    characterContext.changeCharacter(id, fn);

  return [character!, changeCharacter];
};

export const useCurrentCharacter = (): ReturnType<typeof useCharacter> => {
  const match = useRouteMatch<{ id: string }>();
  return useCharacter(match.params.id);
};
