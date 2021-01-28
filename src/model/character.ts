import { EquipmentItem } from "./equipment";
import { factionData } from "./faction";
import { RoguishFeat, WeaponSkill } from "./model";
import { Playbook, Stats } from "./playbooks/playbook";

export interface Harm {
    injury: { max: number, current: number };
    exhaustion: { max: number, current: number };
    depletion: { max: number, current: number };
}

export interface Character {
    playbook: Playbook;

    // Details
    name: string;
    species: string;
    details: string;
    demeanor: string;

    // Background
    backgroundWhere: string;
    backgroundWhy: string;
    backgroundWho: string;
    backgroundFactionServed: string;
    backgroundFactionEnmity: string;

    drives: string[];
    nature: string;
    connections: {
        [name: string]: string;
    };

    // Reputation
    reputation: {
        [faction: string]: {
            modifier: number;
            notoriety: number;
            prestige: number;
        };
    };

    stats: Stats;
    harm: Harm;

    roguishFeats: { [k in RoguishFeat]?: boolean };
    weaponSkills: { [k in WeaponSkill]?: boolean };
    moves: { [k: string]: boolean };

    equipment: EquipmentItem[];
}

export const fromPlaybook = (playbook: Playbook): Character => {
    return {
        playbook,
        
        name: "",
        species: "",
        details: "",
        demeanor: "",

        backgroundWhere: "",
        backgroundWhy: "",
        backgroundWho: "",
        backgroundFactionServed: "",
        backgroundFactionEnmity: "",

        drives: [],
        nature: "",
        connections: Object.fromEntries(playbook.connections.map(connection => [connection.name, ""])),

        reputation: Object.fromEntries(factionData.map(faction => [faction.name, { modifier: 0, notoriety: 0, prestige: 0 }])),

        stats: playbook.initialStats,
        harm: {
            injury: { max: 4, current: 0 },
            exhaustion: { max: 4, current: 0 },
            depletion: { max: 4, current: 0 },
        },

        roguishFeats: playbook.initialRoguishFeats.startWith,
        weaponSkills: {},
        moves: playbook.moves.starting.startWith,

        equipment: [],
    };
}