// Roguish Feats and Weapon Skills

export const roguishFeats = [
  "Acrobatics", "Blindside", "Counterfeit", "Disable Device", "Hide",
  "Pick Pocket", "Sneak", "Pick Lock", "Sleight of Hand",
] as const;
export type RoguishFeats = typeof roguishFeats;
export type RoguishFeat = typeof roguishFeats[number];

export const weaponSkills = [
  "Cleave", "Confuse Senses", "Disarm", "Harry", "Improvise",
  "Parry", "Quick Shot", "Storm a Group", "Trick Shot", "Vicious Strike"
] as const;
export type WeaponSkills = typeof weaponSkills;
export type WeaponSkill = typeof weaponSkills[number];