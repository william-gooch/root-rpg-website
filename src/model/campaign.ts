import { Character } from "root-rpg-model";

export interface Campaign {
  name: string;
  characters: {
    id: string;
    value: Character;
    automerge: string;
  }[];
}
