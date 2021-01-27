import React from "react";
import { arbiterData } from "./model/playbooks/arbiter";
import { Playbook } from "./model/playbooks/playbook";

const PlaybookContext = React.createContext<Playbook>(arbiterData);

export const PlaybookProvider = PlaybookContext.Provider;
export const usePlaybook = () => React.useContext(PlaybookContext);