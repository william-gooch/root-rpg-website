import { Playbook } from "./playbook";

export const arbiterData: Playbook = {
  name: "The Arbiter",
  blurb: "You are a powerful, obstinate vagabond, serving as somewhere between a mercenary and a protector, perhaps taking sides too easily in the greater conflict between the factions.",
  demeanors: ["Intimidating", "Honest", "Brusque", "Open"],
  drives: [
    {
      name: "Justice",
      description: "Advance when you achieve justice for someone wronged by a powerful, wealthy, or high-status individual.",
    },
    {
      name: "Principles",
      description: "Advance when you express or embody your moral principles at great cost to yourself or your allies.",
    },
    {
      name: "Loyalty",
      description: "You’re loyal to someone; name them. Advance when you obey their order at a great cost to yourself.",
    },
    {
      name: "Protection",
      description: "Name your ward. Advance when you protect them from significant danger, or when time passes and your ward is safe.",
    },
  ],
  natures: [
    {
      name: "Defender",
      description: "Clear your exhaustion track when you put yourself in harm’s way to defend someone against injustice or dire threat.",
    },
    {
      name: "Punisher",
      description: "Clear your exhaustion track when you tell a powerful or dangerous villain to their face that you will punish them.",
    },
  ],
  connections: [
    {
      name: "Protector",
      blurb: "I once protected ### from a mortal blow during a fight, and I would do it again. Why?",
      description: "When they are in reach, mark exhaustion to take a blow meant for them. If you do, take +1 ongoing to weapon moves for the rest of the scene.",
    },
    {
      name: "Partner",
      blurb: "### and I together helped a faction take control of a clearing, and share responsibility for it.",
      description: "When you fill in this connection, you each mark 2-prestige with the faction you helped, and mark 2-notoriety with the faction you harmed. During play, if you are spotted together, then any prestige or notoriety gains with those factions are doubled for the two of you.",
    },
  ],
  initialStats: {
    "Charm": 1,
    "Cunning": 0,
    "Finesse": 0,
    "Luck": -1,
    "Might": 2,
  },
  initialRoguishFeats: {
    choose: 1,
    startWith: {},
    // for other playbooks
    // startWith: {
    //   "Hide": true,
    //   "Sneak": true
    // }
  },
  weaponSkills: {
    choose: 1,
    bolded: {
      "Cleave": true,
      "Disarm": true,
      "Parry": true,
      "Storm a Group": true,
    }
  },
  moves: {
    starting: {
      choose: 3,
      startWith: {},
      // for other playbooks
      // startWith: {
      //   "Toolbox": true
      //   "Repair": true
      // }
    },
    options: [
      {
        name: "Brute",
        description: "Take +1 Might (max +3).",
      },
      {
        name: "Carry a Big Stick",
        description: "When you **use words to pause an argument or violent conflict between others**, roll with Charm. On a hit, they choose: mark 2 exhaustion and keep going, or stop for now. On a 10+, take +1 ongoing to dealing with them peacefully. On a miss, NPCs turn their anger to you, and PCs take +1 ongoing against you for the scene.",
      },
      {
        name: "Crash and Smash",
        description: `When you **smash your way through scenery to reach someone or something**, roll with Might. On a hit, you reach your target. On a 10+, choose 1. On a 7–9, choose 2.
- You hurt yourself: mark 1 injury
- You break an important part of your surroundings
- You damage or leave behind a piece of gear (GM’s choice)
On a miss, you smash through, but you leave yourself totally vulnerable on the other side.`,
      },
      {
        name: "Hardy",
        description: "Take 1 additional injury boxes. Whenever time passes or you journey to a new clearing, you can clear 2 injury boxes automatically.",
      },
      {
        name: "Strong Draw",
        description: "When you **target someone** with a bow, mark wear on the bow to roll with Might. On a hit, mark exhaustion to inflict 1 additional injury. Mark exhaustion again to make your shot ignore the enemy’s armor—they cannot mark wear to absorb the injury.",
      },
      {
        name: "Guardian",
        description: `When you defend someone or something from an immediate NPC or environmental threat, roll with Might. On a hit, you keep them safe and choose one. On a 7–9, it costs: expose yourself to danger or escalate the situation.
- Draw the attention of the threat; they focus on you now.
- Put the threat in a vulnerable spot; take +1 forward to counterstrike.
- Push the threat back; you and your protectee have a chance to maneuver or flee.
On a miss, you take the full brunt of the blow intended for your protectee, and the threat has you where it wants you.`,
      },
    ]
  }
};