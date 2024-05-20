import { ProfileType, StudentClassType, StudentType } from "./index.d.ts";

export interface SetupProgressType {
  progress: [
    { studentNo: boolean },
    { course: boolean },
    { type: boolean }, // regular or irregular
    { yearLevel: boolean },
    { subjects: boolean },
  ]
}

export interface ServerSetupProgressType extends SetupProgressType {
  profile: {
    exists: boolean,
    data: ProfileType | null,
  },
  student: {
    exists: boolean,
    data: StudentType | null,
  },
  classes: {
    exists: boolean,
    data: StudentClassType[] | null,
  },
}