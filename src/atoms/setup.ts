import { atom } from "jotai";

export const courseSearchAtom = atom<string>("")
export const subjSearchAtom = atom<string>("")
export const disableAuthWrapper = atom<boolean>(false)