export interface SetupProgressType {
  progress: [
    { Intro: boolean },               // SetupIntro
    { StudentOrProf: boolean },
    { PdfOrManual: boolean },         // Setup1PdfOrManual
    { AcademicInformation: boolean }, // Setup2CourseYrLevelType
    { Subjects: boolean },            // Setup3Subjects
  ]
}