import { ProfileType, StudentType } from "."

export interface SetupProgressType {
  progress: [
    { studentNo: boolean },
    { course: boolean },
    { type: boolean }, // regular or irregular
    { yearLevel: boolean },
    { subjects: boolean },
  ]
}