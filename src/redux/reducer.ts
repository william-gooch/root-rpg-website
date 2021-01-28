import * as Automerge from "automerge";
import { Character, fromPlaybook } from "../model/character";
import { arbiterData } from "../model/playbooks/arbiter";

const newDoc = (): Automerge.Doc<Character> => Automerge.from(fromPlaybook(arbiterData));

export const reducer = (state = newDoc(), action: any) => {
    return Automerge.change(state, doc => {
        switch(action.type) {
            case "SET_NAME":
                doc.name = action.name;
        }
    });
}