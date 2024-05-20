import { atom } from "jotai";

export enum yearLevel {
  FIRST_YEAR = "1st Year",
  SECOND_YEAR = "2nd Year",
  THIRD_YEAR = "3rd Year",
  FOURTH_YEAR = "4th Year",
}

export interface enrollmentcertSurveyType {
  studentNumber: number | null;
  aduEmail: string | null;
  yearLevel: yearLevel | null;
  gcashNumber: string | null;
  enrollmentCertPDF: Uint8Array | null;
  agreeToTerms: boolean | null;
}

export const enrollmentcertSurveyAtom = atom<enrollmentcertSurveyType>({
  studentNumber: null,
  aduEmail: null,
  yearLevel: null,
  gcashNumber: null,
  enrollmentCertPDF: null,
  agreeToTerms: null,
});