import React from "react";
import * as Automerge from "automerge";
import { arbiterData } from "./model/playbooks/arbiter";
import { Character, fromPlaybook } from "./model/character";

// @ts-ignore
import AutomergeClient from "automerge-client";

type CharacterContextType = [
    Automerge.Doc<Character>,
    (fn: Automerge.ChangeFn<Character>) => void,
]
const CharacterContext = React.createContext<CharacterContextType>(null as any);

export const CharacterProvider: React.FC = props => {
    const [automergeClient, setAutomergeClient] = React.useState<any>();
    const [character, setCharacter] = React.useState<Automerge.Doc<Character>>(undefined as any);

    React.useEffect(() => {
        const socket = new WebSocket("ws://localhost:3001");
        const savedData = JSON.stringify({ a: Automerge.save(Automerge.from(fromPlaybook(arbiterData))) });
        const automergeClient = new AutomergeClient({
            socket,
            savedData,
            save: (data: string) => console.log(data),
            onChange: (id: string, doc: any) => {
                if(id === "a") {
                    setCharacter(doc);
                }
            }
        });
        automergeClient.subscribe("a");
        setAutomergeClient(automergeClient);
    }, []);

    const changeFn = React.useCallback((fn: Automerge.ChangeFn<Character>) => {
        automergeClient.change("a", fn);
    }, [automergeClient]);

    return (
        <CharacterContext.Provider value={[character, changeFn]}>
            {props.children}
        </CharacterContext.Provider>
    );
}
export const useCharacter = () => React.useContext(CharacterContext);