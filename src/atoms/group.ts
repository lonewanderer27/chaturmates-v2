import { NEW_GROUP } from "../constants/group";
import { NewGroupInputs } from "../types/group/NewGroup";
import { atom } from "jotai";

export const newGroupAtom = atom<NewGroupInputs>(NEW_GROUP);