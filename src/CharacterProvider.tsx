import React from "react";
import * as Automerge from "automerge";
import { arbiterData } from "./model/playbooks/arbiter";
import { Character, fromPlaybook } from "./model/character";

type CharacterContextType = [
    Automerge.Doc<Character>,
    (fn: Automerge.ChangeFn<Character>) => void,
]
const CharacterContext = React.createContext<CharacterContextType>(null as any);

export const CharacterProvider: React.FC = props => {
    const [character, setCharacter] = React.useState(Automerge.from(fromPlaybook(arbiterData)));

    const changeFn = React.useCallback((fn: Automerge.ChangeFn<Character>) => {
        setCharacter(Automerge.change(character, fn));
    }, [character, setCharacter]);

    return (
        <CharacterContext.Provider value={[character, changeFn]}>
            {props.children}
        </CharacterContext.Provider>
    );
}
export const useCharacter = () => React.useContext(CharacterContext);