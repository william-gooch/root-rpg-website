import arbiter from "assets/vagabonds/arbiter.png";
import ranger from "assets/vagabonds/ranger.png";
import { playbooks } from "root-rpg-model";

const vagabonds: { [key in keyof typeof playbooks]: string } = { arbiter, ranger };

export default vagabonds;
