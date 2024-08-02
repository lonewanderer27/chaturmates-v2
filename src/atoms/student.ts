import { NEW_GROUP } from "../constants/group";
import { NewGroupInputs } from "../types/group/NewGroup";
import { atom } from "jotai";
import { NewStudentType, NewStudentTypeSteps } from "../types/student/post/NewStudentType";
import { NEW_STUDENT } from "../constants/student";

export const newStudentAtom = atom<NewStudentTypeSteps>(NEW_STUDENT);