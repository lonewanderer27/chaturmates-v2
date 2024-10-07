import { number } from "yup";
import { DEFAULT_ACADEMIC_YEAR } from "./academicYear";
import { DEFAULT_COURSE } from "./course";
import { DEFAULT_STUDENT_NO } from "./studentNo";

export const NEW_STUDENT = {
  step1: {
    fullName: "",
    description: "",
  },
  step2: {
    studentNo: 0,
    course: 0,
    yearLevel: 0,
    academicYear: 0,
    type: true,
    block: "",
  },
  step3: {
    classes: [
      {
        subjectId: 1,
        room: "",
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
        startTime: "",
        endTime: "",
      },
    ],
  },
  step4: {
    hobbies: [],
  },
};
