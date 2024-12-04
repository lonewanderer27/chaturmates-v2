import { atom } from "jotai";
import { Worker } from "tesseract.js";

export const courseSearchAtom = atom<string>("")
export const subjSearchAtom = atom<string>("")
export const disableAuthWrapper = atom<boolean>(false)
export const workerAtom = atom<Worker | null>(null);