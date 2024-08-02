import { SetupProgressType } from "../../types/setup";
import { useIonAlert, useIonRouter } from "@ionic/react";
import useSession from "../auth/useSession";
import { useState, useEffect } from "react";
import { useSteps } from "../useSteps";
import { useHistory } from "react-router";
import { AcademicYearType, CourseType } from "../../types";
import client from "../../client";
import { useAtom } from "jotai";
import { newStudentAtom } from "../../atoms/student";

export default function useSetup() {
  const [progress, setProgress] = useState<SetupProgressType["progress"]>([
    { Intro: false },
    { StudentOrProf: false },
    { PdfOrManual: false },
    { AcademicInformation: false },
    { Subjects: false },
  ]);

  const stepHookParts = useSteps(4);
  const rt = useIonRouter();
  const history = useHistory();
  const { session } = useSession();

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action === "POP") {
        console.log("POP");
        stepHookParts.goToPrevStep();
      }
    });
    return () => {
      unlisten();
    };
  }, [history, stepHookParts]);

  const [newStudent, setNewStudent] = useAtom(newStudentAtom);

  const checkProgress = async () => {
    // calls the edge function to check the progress of the user

    // check if there's a student
    const { data, error } = await client
      .from("profiles")
      .select("*, student:students(*)")
      .eq("id", session!.user.id)
      .single();

    if (error || data === null) {
      setProgress([
        { Intro: false },
        { StudentOrProf: false },
        { PdfOrManual: false },
        { AcademicInformation: false },
        { Subjects: false },
      ]);
    }

    if (data?.student !== undefined) {
      setProgress([
        { Intro: true },
        { StudentOrProf: true },
        { PdfOrManual: true },
        { AcademicInformation: true },
        { Subjects: false },
      ]);
    }

    // check if there are added classes
    const { data: classes, error: classesError } = await client
      .from("classes")
      .select("*")
      .eq("student_id", data?.student[0].id!);

    if (classesError || classes === null) {
      setProgress([
        { Intro: true },
        { StudentOrProf: true },
        { PdfOrManual: true },
        { AcademicInformation: true },
        { Subjects: false },
      ]);
    } else {
      setProgress([
        { Intro: true },
        { StudentOrProf: true },
        { PdfOrManual: true },
        { AcademicInformation: true },
        { Subjects: true },
      ]);
    }
  };

  const createStudent = async (props: {
    studentNo: string;
    fullName: string;
    course: CourseType;
    yearLevel: number;
    academicYear: AcademicYearType;
    isRegular: boolean;
  }) => {
    // const { error } = await client
    //   .from("students")
    //   .insert({
    //     school: 1 // default school: Adamson University
    //     student
    //   });
  };

  const handleUpdateAcademicInformation = async (info: {
    fullName: string | null;
    course: CourseType | null;
    yearLevel: number | null;
    isRegular: boolean | null;
  }) => {
    // console.log(info);
    // const { error } = await client
    //   .from("")
  };

  const handleNext = () => {
    // TODO: Let's make this dynamic by examining the data that we have in the progress state
    // and push the next route based on that
    console.log("handleNext");
    console.log(rt.routeInfo.pathname);
    switch (rt.routeInfo.pathname) {
      case "/setup":
        rt.push("/setup/studentOrProf");
        break;
      case "/setup/studentOrProf":
        rt.push("/setup/pdfUpload");
        break;
      case "/setup/pdfUpload":
        rt.push("/setup/introduceYourself");
        break;
      case "/setup/introduceYourself":
        rt.push("/setup/academicInformation");
        break;
      case "/setup/academicInformation":
        rt.push("/setup/subjects");
        break;
      case "/setup/subjects":
        rt.push("/setup/finish");
        break;
    }
  };

  const handlePrev = () => {
    if (stepHookParts.currentStep > 0) {
      stepHookParts.goToPrevStep();
    }
  };

  const [uploading, setUploading] = useState(false);
  const [showAlert] = useIonAlert();
  const handleUpload = async () => {
    // upload the student information
    const { data, error } = await client
      .from("students")
      .insert({
        academic_year_id: newStudent.step2.academicYear!,
        course: newStudent.step2.course!,
        description: newStudent.step1.description!,
        full_name: newStudent.step1.fullName!,
        profile_id: session!.user.id!,
        school: 1,
        school_email: session!.user.email!,
        student_no: newStudent.step2.studentNo! + "",
        type: newStudent.step2.type ? "regular" : "irregular",
        verified: true,
        year_level: newStudent.step2.yearLevel!,
      })
      .select("*");

    if (error) {
      showAlert({
        header: "Error",
        message:
          "An error occurred while uploading your information. Please try again. \n\n" +
          error.message,
        buttons: ["OK"],
      });
      return;
    }
  };

  return {
    progress,
    checkProgress,
    ...stepHookParts,
    handlePrev,
    handleNext,
    handleUpload,
    uploading,
  };
}
