import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonProgressBar,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";

import { hideTabBar } from "../../utils/TabBar";
import useSetup from "../../hooks/setup/useSetup";
import useFetchCourses from "../../hooks/setup/useFetchCourses";
import { FC, useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import { useAtom } from "jotai";
import { courseSearchAtom, subjSearchAtom } from "../../atoms/setup";
import { AcademicYearType, CourseType } from "../../types";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { NewStudentTypeSteps } from "../../types/student/post/NewStudentType";
import { newStudentAtom } from "../../atoms/student";
import { boolean, number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetchAcademicYears from "../../hooks/setup/useFetchAcademicYears";
import { closeOutline } from "ionicons/icons";

const validationSchema = object().shape({
  studentNo: number().required("Student No. is required"),
  course: number().required("Course is required"),
  yearLevel: number().required("Year Level is required"),
  academicYear: number().required("Academic Year is required"),
  type: boolean().required("Type is required"),
  block: string().optional(),
});

const Setup3AcademicInformation: FC<RouteComponentProps> = ({ match }) => {
  useIonViewWillEnter(() => {
    hideTabBar();
  });

  const { handleNext: next } = useSetup();
  const courseModal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  const openCourseModal = () => {
    courseModal.current?.present();
  };

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  useEffect(() => {
    setPresentingElement(page.current);
  }, []);
  const [courseSearch, setCourseSearch] = useAtom(courseSearchAtom);

  const { data: courses } = useFetchCourses();
  const { data: academicYears } = useFetchAcademicYears();
  const [filteredCourses, setFilteredCourses] = useState<CourseType[]>(
    courses ?? []
  );
  useEffect(() => {
    if (courses) {
      setFilteredCourses(
        courses.filter((course) =>
          course.title.toLowerCase().includes(courseSearch.toLowerCase())
        )
      );
    }
  }, [courseSearch, courses]);

  const [studentNo, setStudentNo] = useState<number | null>(null);
  const [course, setCourse] = useState<CourseType | null>(null);
  const [yearLevel, setYearLevel] = useState<number | null>(null);
  const [academicYear, setAcademicYear] = useState<AcademicYearType | null>(
    null
  );
  const [isRegular, setIsRegular] = useState<boolean | null>(null);

  const [newStudent, setNewStudent] = useAtom(newStudentAtom);
  const {
    register,
    handleSubmit,
    setError,
    getFieldState,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<NewStudentTypeSteps["step2"]>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      // check if there is a value in the student atom
      // if there is, set the default values to that
      // else, set the default values to an empty object
      studentNo:
        newStudent.step2.studentNo !== 0
          ? newStudent.step2.studentNo!
          : undefined,
      course:
        newStudent.step2.course !== 0 ? newStudent.step2.course : undefined,
      yearLevel:
        newStudent.step2.yearLevel !== 0
          ? newStudent.step2.yearLevel
          : undefined,
      academicYear:
        newStudent.step2.academicYear !== 0
          ? newStudent.step2.academicYear
          : undefined,
      type: 
        newStudent.step2.type !== undefined
          ? newStudent.step2.type
          : undefined,
      block: newStudent.step2.block,
    },
  });
  const [checking, setChecking] = useState(() => false);
  const handleError: SubmitErrorHandler<NewStudentTypeSteps["step2"]> = (
    errors,
    event
  ) => {
    console.log("handleError");
    console.log(errors);
    console.log(getValues());
  };
  const handleNext: SubmitHandler<NewStudentTypeSteps["step2"]> = async (
    data
  ) => {
    console.log("handleNext");
    console.log(data);
    setChecking(() => true);
    setNewStudent((prev) => ({
      ...prev,
      step2: data,
    }));
    setChecking(() => false);

    // route to next page
    next();
  };

  const handleCourse = (course: CourseType) => {
    setValue("course", course.id);
    setCourse(course);
    courseModal.current?.dismiss();
  };

  const handleAcademicYear = (academicYear: AcademicYearType) => {
    setValue("academicYear", academicYear.id);
    setAcademicYear(academicYear);
  };

  useEffect(() => {
    console.log(getValues());
  }, []);

  return (
    <IonPage ref={page}>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                defaultHref={"/" + match.path.split("/")[1]}
                text=""
              />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow className="pb-[20px]">
            <IonCol>
              <IonText className="text-center">
                <h3>Academic Information</h3>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow className="py-1">
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Student No
                </IonText>
              </IonLabel>
              <IonInput
                errorText={errors.studentNo?.message}
                {...register("studentNo")}
                type="number"
                placeholder="Enter your student no."
                value={getValues("studentNo")}
              />
            </IonCol>
          </IonRow>
          <IonRow className="py-1">
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Course
                </IonText>
              </IonLabel>
              <IonInput
                errorText={errors.course?.message}
                onClick={openCourseModal}
                placeholder="Select your course"
                readonly
                value={
                  courses?.find((course) => course.id === getValues("course"))
                    ?.full_title ?? ""
                }
              />
            </IonCol>
          </IonRow>
          <IonRow className="py-1">
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Year Level
                </IonText>
              </IonLabel>
              <div className="flex justify-center">
                <IonSelect
                  {...register("yearLevel")}
                  interface="action-sheet"
                  interfaceOptions={{
                    header: "Select your level",
                  }}
                  placeholder="Select your level"
                >
                  <IonSelectOption value={1}>1st</IonSelectOption>
                  <IonSelectOption value={2}>2nd</IonSelectOption>
                  <IonSelectOption value={3}>3rd</IonSelectOption>
                  <IonSelectOption value={4}>4th</IonSelectOption>
                </IonSelect>
              </div>
              {errors.yearLevel && (
                <div>
                  <IonText color="danger">Year Level is required</IonText>
                </div>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="py-1">
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Academic Year
                </IonText>
              </IonLabel>
              <div className="flex justify-center">
                <IonSelect
                  interface="action-sheet"
                  interfaceOptions={{
                    header: "Select your academic year",
                  }}
                  placeholder="Select your academic year"
                  {...register("academicYear")}
                >
                  {academicYears?.map((academicYear, index) => (
                    <IonSelectOption
                      key={"academicYear:" + academicYear.id + index}
                      value={academicYear.id}
                    >
                      {academicYear.academic_year}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </div>
              {errors.academicYear && (
                <div>
                  <IonText color="danger">Academic Year is required</IonText>
                </div>
              )}
            </IonCol>
          </IonRow>
          <IonRow className="py-1">
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Do you have a block section?
                </IonText>
              </IonLabel>
              <br />
              <IonRadioGroup
                onIonChange={(e) => {
                  setValue("type", e.detail.value);
                  trigger("block");
                }}
                value={getValues("type")}
              >
                <IonItem className=" rounded-full mt-[10px]">
                  <IonRadio value={true} slot="start" justify="space-between">
                    Yes
                  </IonRadio>
                  <IonRadio value={false} slot="end" justify="space-between">
                    No
                  </IonRadio>
                </IonItem>
              </IonRadioGroup>
              {errors.type && (
                <div className="mt-[5px]">
                  <IonText color="danger">{errors.type.message}</IonText>
                </div>
              )}
            </IonCol>
          </IonRow>
          {getValues("type") && (
            <IonRow className="py-1">
              <IonCol>
                <IonLabel>
                  <IonText className="font-poppins font-semibold text-lg">
                    Block No
                  </IonText>
                </IonLabel>
                <IonInput
                  errorText={errors.block?.message}
                  {...register("block")}
                  placeholder="Enter your Block No."
                  value={getValues("block")}
                />
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
        <IonModal ref={courseModal} presentingElement={presentingElement!}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Select your course</IonTitle>
              <IonButtons slot="start">
                <IonButton
                  fill="clear"
                  onClick={() => {
                    courseModal.current?.dismiss();
                  }}
                >
                  <IonIcon src={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonHeader>
              <IonSearchbar
                value={courseSearch}
                onIonInput={(e) => {
                  setCourseSearch(e.detail.value ?? "");
                }}
              />
            </IonHeader>
            <IonList>
              {filteredCourses?.map((course, index) => (
                <IonItem
                  key={"course:" + course.title + index}
                  onClick={() => handleCourse(course)}
                >
                  <IonLabel>{course.full_title}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
      <IonFooter>
        <IonToolbar className="p-4 flex justify-end">
          <IonButton
            shape="round"
            slot="end"
            onClick={handleSubmit(handleNext, handleError)}
          >
            Next
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Setup3AcademicInformation;
