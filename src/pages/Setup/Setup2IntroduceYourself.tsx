import { yupResolver } from "@hookform/resolvers/yup";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps } from "react-router";
import { NewGroupInputs } from "../../types/group/NewGroup";
import { NewStudentTypeSteps } from "../../types/student/post/NewStudentType";
import { object, string } from "yup";
import { NEW_STUDENT } from "../../constants/student";
import { useAtom } from "jotai";
import { newStudentAtom } from "../../atoms/student";
import { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useSteps } from "../../hooks/useSteps";
import useSetup from "../../hooks/setup/useSetup";
import { hideTabBar } from "../../utils/TabBar";

// VS = Validation Schema
export const VSIntroduceYourself = object().shape({
  fullName: string().required("Your full name is required").min(2),
  description: string().optional(),
});

const Setup2IntroduceYourself: FC<RouteComponentProps> = ({ match }) => {
  useIonViewWillEnter(() => {
    hideTabBar();
  });

  const [newStudent, setNewStudent] = useAtom(newStudentAtom);
  const rt = useIonRouter();
  const {
    register,
    handleSubmit,
    setError,
    getFieldState,
    formState: { errors },
  } = useForm<NewStudentTypeSteps["step1"]>({
    resolver: yupResolver(VSIntroduceYourself),
    defaultValues: async () => {
      // check if there is a value in the student atom
      // if there is, set the default values to that
      // else, set the default values to an empty object
      return {
        fullName: newStudent.step1.fullName || "",
        description: newStudent.step1.description || "",
      };
    },
  });
  const { handleNext: next } = useSetup();

  const [checking, setChecking] = useState(() => false);
  const handleError: SubmitErrorHandler<NewStudentTypeSteps["step1"]> = (
    errors,
    event
  ) => {
    console.log("handleError");
    console.log(errors);
  };
  const handleNext: SubmitHandler<NewStudentTypeSteps["step1"]> = async (
    data
  ) => {
    console.log("handleNext");
    console.log(data);
    setChecking(() => true);
    setNewStudent((prev) => ({
      ...prev,
      step1: data,
    }));
    setChecking(() => false);

    // route to next page
    next();
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                defaultHref={"/" + match.path.split("/")[1]}
                text=""
              />
            </IonButtons>
            {/* <IonTitle>Introduce Yourself</IonTitle> */}
          </IonToolbar>
        </IonHeader>
        <IonGrid className="mt-[10px]">
          <IonRow className="pb-[20px]">
            <IonCol>
              <IonText className="text-center">
                <h3>Introduce Yourself</h3>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Full Name
                </IonText>
              </IonLabel>
              <IonInput
                className={`custom my-2 text-lg ${
                  getFieldState("fullName").isTouched ? "ion-touched" : ""
                } ${
                  errors.fullName
                    ? "ion-touched ion-invalid border-red-500"
                    : ""
                }`}
                type="text"
                errorText={errors.fullName?.message}
                placeholder="Enter your full name"
                {...register("fullName")}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Description
                </IonText>
              </IonLabel>
              <IonTextarea
                className={`custom my-2 text-lg ${
                  getFieldState("fullName").isTouched ? "ion-touched" : ""
                } ${
                  errors.description
                    ? "ion-touched ion-invalid border-red-500"
                    : ""
                }`}
                errorText={errors.description?.message}
                placeholder="Tell us about yourself"
                rows={5}
                {...register("description")}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar className="p-4 flex justify-end">
          <IonButton
            shape="round"
            onClick={handleSubmit(handleNext, handleError)}
            slot="end"
          >
            {checking ? <IonSpinner name="dots" /> : <span>Next</span>}
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Setup2IntroduceYourself;
