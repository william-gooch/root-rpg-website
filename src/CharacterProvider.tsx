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
export const useCharacterProperty = (propertyName: keyof Character): [Character[keyof Character], React.Dispatch<React.SetStateAction<Character[keyof Character]>>] => {
    const [doc, changeDoc] = useCharacter();

    const val = doc[propertyName];
    const setVal = (v: Character[keyof Character] | ((prevState: Character[keyof Character]) => Character[keyof Character])) => {
        changeDoc(d => {
            if(typeof v === "function") {
                d[propertyName] = v(d[propertyName]) as any;
            } else {
                d[propertyName] = v as any;
            }
        });
    }

    return [val, setVal];
}