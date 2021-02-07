import arbiter from "assets/vagabonds/arbiter.png";
import ranger from "assets/vagabonds/ranger.png";
import scoundrel from "assets/vagabonds/scoundrel.png";
import thief from "assets/vagabonds/thief.png";
import tinker from "assets/vagabonds/tinker.png";
import vagrant from "assets/vagabonds/vagrant.png";
import adventurer from "assets/vagabonds/adventurer.png";
import harrier from "assets/vagabonds/harrier.png";
import ronin from "assets/vagabonds/ronin.png";

import chronicler from "assets/vagabonds/chronicler.png";
import exile from "assets/vagabonds/exile.png";
import seeker from "assets/vagabonds/seeker.png";
import { playbooks } from "root-rpg-model";

const vagabonds: { [key in keyof typeof playbooks]: string } = {
  arbiter,
  ranger,
  scoundrel,
  thief,
  tinker,
  vagrant,
  adventurer,
  harrier,
  ronin,
  chronicler,
  exile,
  seeker,
};

export default vagabonds;
