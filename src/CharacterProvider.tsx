import React from "react";
import * as Automerge from "automerge";
import { Character, fromPlaybook, playbooks } from "root-rpg-model";

// @ts-ignore
import AutomergeClient from "automerge-client";

type CharacterContextType = [
    Automerge.Doc<Character>,
    (fn: Automerge.ChangeFn<Character>) => void,
]
const CharacterContext = React.createContext<CharacterContextType>(null as any);

const initializeDocument = (doc: Automerge.Doc<Character>) => {
    const template = Automerge.from(fromPlaybook(playbooks.arbiter));
    return Automerge.merge(doc, template);
}

export const CharacterProvider: React.FC<{ id: string }> = props => {
    const [automergeClient, setAutomergeClient] = React.useState<any>();
    const [character, setCharacter] = React.useState<Automerge.Doc<Character>>(undefined as any);

    React.useEffect(() => {
        const socket = new WebSocket("ws://localhost:3001");
        const automergeClient = new AutomergeClient({
            socket,
            savedData: localStorage.getItem("automerge"),
            save: (data: string) => localStorage.setItem("automerge", data),
            onChange: (id: string, doc: Automerge.Doc<Character>) => {
                if(id === props.id) {
                    setCharacter(doc);
                }
            }
        });
        automergeClient.subscribe(props.id);
        setAutomergeClient(automergeClient);
    }, [props.id]);

    const changeFn = React.useCallback((fn: Automerge.ChangeFn<Character>) => {
        automergeClient.change(props.id, fn);
    }, [props.id, automergeClient]);

    return (
        <CharacterContext.Provider value={[character, changeFn]}>
            {props.children}
        </CharacterContext.Provider>
    );
}
export const useCharacter = () => React.useContext(CharacterContext);