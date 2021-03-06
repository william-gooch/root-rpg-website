import { Character, playbooks } from "root-rpg-model";
import { api } from "./api";

const myCharacters = async (): Promise<{ [id: string]: Character }> => {
  const response = await api.get(`/character/my`);
  return response.data as { [id: string]: Character };
};

const getCharacter = async (characterId: string): Promise<Character> => {
  const response = await api.get(`/character/${characterId}`);
  return response.data as Character;
};

const newCharacter = async (playbook: keyof typeof playbooks): Promise<string> => {
  const response = await api.post(`/character/new/${playbook}`, {});
  return response.data as string;
};

const deleteCharacter = async (characterId: string): Promise<boolean> => {
  await api.delete(`/character/${characterId}`);
  return true;
};

export default {
  my: myCharacters,
  get: getCharacter,
  new: newCharacter,
  delete: deleteCharacter,
};
