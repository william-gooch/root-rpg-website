import React from "react";
import * as Automerge from "automerge";
import { Character } from "root-rpg-model";

// @ts-ignore
import AutomergeClient from "automerge-client";
import { useHistory } from "react-router-dom";
import { useSocket } from "./SocketProvider";

type CharacterContextType = [
    Automerge.Doc<Character>, // document
    (fn: Automerge.ChangeFn<Character>) => void, // change document
]
const CharacterContext = React.createContext<CharacterContextType>(null as any);

export const CharacterProvider: React.FC<{ id: string }> = props => {
    const [automergeClient, setAutomergeClient] = React.useState<any>();
    const [character, setCharacter] = React.useState<Automerge.Doc<Character>>(undefined as any);
    const socket = useSocket();
    
    const history = useHistory();

    React.useEffect(() => {
        if(!socket || !props.id) return;
        const automergeClient = new AutomergeClient({
            socket,
            // savedData: localStorage.getItem("automerge"),
            // save: (data: string) => localStorage.setItem("automerge", data),
            onChange: (id: string, doc: Automerge.Doc<Character>) => {
                if(id === props.id) {
                    setCharacter(doc);
                }
            }
        });

        automergeClient.subscribe([props.id]);
        setAutomergeClient(automergeClient);
    }, [props.id, history, socket]);

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