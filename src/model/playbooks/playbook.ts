import { RoguishFeat, WeaponSkill } from "../model";

export interface Drive {
  name: string;
  description: string;
}

export interface Nature {
  name: string;
  description: string;
}

export interface Connection {
  name: string;
  blurb: string;
  description: string;
}

export interface Stats {
  "Charm": number;
  "Cunning": number;
  "Finesse": number;
  "Luck": number;
  "Might": number;
}
export type Stat = keyof Stats;

export interface Move {
  name: string;
  description: string;
}

export interface Playbook {
  name: string;
  blurb: string;
  demeanors: string[];
  drives: Drive[];
  natures: Nature[];
  connections: Connection[];
  initialStats: Stats;
  initialRoguishFeats: {
    choose: number;
    startWith: {
      [k in RoguishFeat]?: boolean;
    };
  };
  weaponSkills: {
    choose: number;
    bolded: {
      [k in WeaponSkill]?: boolean;
    };
  };
  moves: {
    starting: {
      choose: number;
      startWith: {
        [key: string]: boolean;
      };
    };
    options: Move[];
  }
}
