import * as Automerge from "automerge";
import { Character, fromPlaybook, playbooks } from "root-rpg-model";

const newDoc = (): Automerge.Doc<Character> => Automerge.from(fromPlaybook(playbooks.arbiter));

export const reducer = (state = newDoc(), action: any) => {
    return Automerge.change(state, doc => {
        switch(action.type) {
            case "SET_NAME":
                doc.name = action.name;
        }
    });
}