export interface SetupProgressType {
  progress: [
    { Intro: boolean },               // SetupIntro
    { PdfOrManual: boolean },         // Setup1PdfOrManual
    { Course_YrLevel_Type: boolean }, // Setup2CourseYrLevelType
    { Subjects: boolean },            // Setup3Subjects
  ]
}