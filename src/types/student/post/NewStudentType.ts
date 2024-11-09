import { ClassType } from "../..";
import { CourseType, AcademicYearType, SubjectType } from "../..";

export interface NewStudentType {
  email: string,
  fullName: string,
  password: string
  passwordConfirmation: string,
  agreeToTerms: boolean
}

export interface NewStudentTypeSteps {
  step1: {
    fullName: string;
    description?: string | undefined;
  },  
  step2: {
    studentNo: number,
    course: number,
    yearLevel: number,
    academicYear: number,
    type: boolean                   // isRegular,
    block?: string,
  },
  step3: {
    classes: {
      subjectId: number,
      room?: string,
      monday?: boolean,
      tuesday?: boolean,
      wednesday?: boolean,
      thursday?: boolean,
      friday?: boolean,
      saturday?: boolean,
      sunday?: boolean,
      startTime?: string,
      endTime?: string,
    }[]
  },
  step4: {
    hobbies: number[]
  }
}