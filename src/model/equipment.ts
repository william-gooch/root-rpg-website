import { WeaponSkill } from "./model";

export const tags = [
  { name: "Arrow-Proof", description: "Ignore the first hit dealing injury from arrows that you suffer in a scene." },
  { name: "Blunted", description: "This weapon inflicts exhaustion, not injury." },
  { name: "Ceremonial", description: "Choose an attached faction. While this item is displayed, treat yourself as having +1 Reputation with that faction, and -1 Reputation with other factions." },
  { name: "Comfortable", description: "This item counts as 1 fewer Load." },
  { name: "Cumbersome", description: "Mark one exhaustion while you wear your armor— clear one exhaustion when you take it off." },
  { name: "Eaglecraft", description: "Mark wear when **engaging in melee** to both make and suffer another exchange of harm." },
  { name: "Fast", description: "Mark wear when **engaging in melee** to suffer 1 fewer harm, even on a miss." },
  { name: "Friendly", description: "When you **meet someone important**, mark exhaustion to roll with your Reputation +1." },
  { name: "Flexible", description: "When you **grapple** with someone, mark exhaustion to ignore the first choice they make." },
  { name: "Foxfolk Steel", description: "Ignore the first box of wear you mark on this item each session." },
  { name: "Hair Trigger", description: "Mark wear to **target a vulnerable foe** at close range instead of far." },
  { name: "Healer’s Kit", description: "Mark wear to clear exhaustion. Mark 2 wear to clear injury." },
  { name: "Heavy Bludgeon", description: "Mark exhaustion to to ignore the enemy’s armor when you inflict harm." },
  { name: "Heavy Draw Weight", description: "When you **target a vulnerable foe** with this bow, mark exhaustion to inflict 1 additional injury." },
  { name: "Iron bolts", description: "This weapon inflicts 1 additional wear when its harm is absorbed by armor." },
  { name: "Large", description: "Mark exhaustion when inflicting harm with this weapon to inflict 1 additional harm." },
  { name: "Luxury", description: "After creation, this item is worth +3 Value." },
  { name: "Mousefolk Steel", description: "Mark wear to **engage in melee** using Cunning instead of Might." },
  { name: "Oiled string", description: "Mark wear to use the weapon skill **quick shot** even if you don’t have it." },
  { name: "Quick", description: "Mark exhaustion to **engage in melee** with Finesse instead of Might." },
  { name: "Rabbitfolk Steel", description: "Mark wear to **engage in melee** with Finesse instead of Might." },
  { name: "Reach", description: "When you **engage in melee**, mark wear on this weapon to inflict harm instead of trading harm; you cannot use this tag if your enemy’s weapon also has *reach*." },
  { name: "Sharp", description: "Mark wear when inflicting harm with this weapon to inflict 1 additional harm." },
  { name: "Short Limbs", description: "Mark wear to fire a **quick shot** at far range." },
  { name: "Slow", description: "When you **engage in melee** with this weapon, choose one fewer option. Mark wear to ignore this effect." },
  { name: "Thick", description: "When you mark wear on this shield to block a hit, you only ever mark 1-wear, even if you are blocking more harm from a single hit." },
  { name: "Throwable", description: "Mark exhaustion to **target a vulnerable** foe with this weapon at far range." },
  { name: "Tightly Woven", description: "When you take a few seconds to repair this armor after a fight, clear 1-wear you marked during the fight." },
  { name: "Tricky", description: "When you use this item to **trick an NPC** by distracting them at a distance, on a 7-9 mark wear to eliminate one option from the **trick an NPC** move before the NPC picks." },
  { name: "Unassuming", description: "Until you harm an enemy, they will never deem you more of a threat than other vagabonds with arms and armor." },
  { name: "Versatile", description: "When you move to or from a range this weapon can reach, mark wear to make a quick strike and inflict 1-injury on any opponent in this weapon’s range." },
  { name: "Weighty", description: "This item counts as 1 additional Load." },
] as const;
export type TagName = typeof tags[number]["name"];

export type Range = "Intimate" | "Close" | "Far";

export interface EquipmentItem {
  name: string;
  wear: number;
  value: number;
  load: 0;
  range: Range[];
  skillTags: WeaponSkill[];
  tags: TagName[];
}

export const defaultEquipment: EquipmentItem[] = [
  {
    name: "Dagger",
    wear: 1,
    value: 5,
    load: 0,
    range: ["Intimate", "Close"],
    skillTags: ["Parry", "Vicious Strike"],
    tags: ["Quick"],
  },
  {
    name: "Chainmail",
    wear: 3,
    value: 3,
    load: 0,
    range: [],
    skillTags: [],
    tags: ["Tightly Woven", "Weighty"],
  },
];