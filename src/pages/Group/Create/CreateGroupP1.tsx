import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonRouter,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";

import { NewGroupInputs } from "../../../types/group/NewGroup";
import { RouteComponentProps } from "react-router";
import client from "../../../client";
import { newGroupAtom } from "../../../atoms/group";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import useHideTabs from "../../../hooks/useHideTabs";

const CreateGroupP1: React.FC<RouteComponentProps> = ({ match }) => {
  useHideTabs();

  const [show, dismiss] = useIonAlert();
  const rt = useIonRouter();
  const validationSchema = object().shape({
    name: string().required("Name of the group is required").min(3),
    description: string()
      .required("Description of the group is required")
      .min(3),
    vanity_id: string().required("Vanity ID is required").min(2),
  });
  const [nameChecking, setChecking] = useState(() => false);
  const [newGroup, setNewGroup] = useAtom(newGroupAtom);

  const {
    register,
    handleSubmit,
    setError,
    getFieldState,
    setFocus,
    formState: { errors },
  } = useForm<NewGroupInputs["step1"]>({
    resolver: yupResolver(validationSchema),
    defaultValues: newGroup.step1,
  });

  useIonViewWillEnter(() => {
    // focus on the name input on page load
    setTimeout(() => {
      setFocus("name");
    }, 300)
  })

  const handleError: SubmitErrorHandler<NewGroupInputs["step1"]> = (
    errors,
    event
  ) => {
    console.log("handleError");
    console.log(errors);
  };

  const handleNext: SubmitHandler<NewGroupInputs["step1"]> = async (data) => {
    setChecking(() => true);
    console.log("handleNext");
    console.log(data);

    // set group name and description in the atom
    setNewGroup((prev: any) => {
      return {
        ...prev,
        step1: data,
      };
    });

    // check if the name exists
    console.log("checking if the name is unique");
    const res = await client
      .from("groups")
      .select("name")
      .ilike("name", data.name);

    console.log(res);

    setChecking(() => false);

    // if a group already exists, then the name is not unique
    if (res.data && res.data?.length > 0) {
      console.log("group name exists");
      setError("name", {
        type: "value",
        message: "Group already exists",
      });
      return;
    }

    if (res.error) {
      console.log(res.error.message);
      await show({
        header: "Error",
        message: "Something went wrong. Please try again",
        buttons: ["OK"],
      });
      return;
    }
    // there's no group, that means the name is unique

    // check if the vanity url exists
    console.log("checking if the vanity url is unique");
    const res2 = await client
      .from("groups")
      .select("vanity_id")
      .ilike("vanity_id", data.vanity_id);

    console.log(res);

    // if a group already exists, then the vanity url is not unique
    if (res2.data!.length > 0) {
      console.log("vanity url is not unique");
      setError("vanity_id", {
        type: "value",
        message: "This ID is already taken. Please choose another one.",
      });

      return;
    }

    setChecking(() => false);

    if (res2.error) {
      console.log(res2.error.message);
      return;
    }

    // there's no group, that means the vanity url is unique
    rt.push("/" + match.path.split("/")[1] + "/group/create/p2", "forward");
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                text={""}
                defaultHref={"/" + match.path.split("/")[1]}
              />
            </IonButtons>
            {/* <IonTitle>Create Group</IonTitle> */}
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow className="pb-[20px]">
            <IonCol>
              <IonText className="text-center">
                <h3>Create Group</h3>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Name
                </IonText>
              </IonLabel>
              <IonInput
                className={`custom my-2 text-lg ${
                  getFieldState("name").isTouched ? "ion-touched" : ""
                } ${
                  errors.name ? "ion-touched ion-invalid border-red-500" : ""
                }`}
                placeholder="Name of your group"
                type="text"
                errorText={getFieldState("name").error?.message}
                {...register("name")}
              ></IonInput>
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
                autoGrow={true}
                className={`custom my-2 text-lg ${
                  getFieldState("name").isTouched ? "ion-touched" : ""
                } ${
                  errors.description
                    ? "ion-touched ion-invalid border-red-500"
                    : ""
                }`}
                errorText={getFieldState("description").error?.message}
                placeholder="Description of your group"
                {...register("description")}
              ></IonTextarea>
            </IonCol>
          </IonRow>
          <IonRow className="pt-5">
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Vanity ID
                </IonText>
              </IonLabel>
              <IonInput
                className={`custom my-2 text-lg ${
                  getFieldState("vanity_id").isTouched ? "ion-touched" : ""
                } ${
                  errors.vanity_id
                    ? "ion-touched ion-invalid border-red-500"
                    : ""
                }`}
                placeholder={`Enter Vanity ID`}
                errorText={getFieldState("vanity_id").error?.message}
                {...register("vanity_id")}
              ></IonInput>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div className="m-[-5px] mt-[-20px]">
          <IonCard>
            <IonCardContent>
              This will serve as your group's Invite ID
            </IonCardContent>
          </IonCard>
        </div>
        {/* <div className="m-[-5px]">
          <IonCard>
            <IonCardContent>
              <IonText>Anyone can see who's in the group.</IonText>
            </IonCardContent>
          </IonCard>
          <IonCard className="mt-0">
            <IonCardContent>
              <IonText>
                Posts of the group can only be seen by approved members.
              </IonText>
            </IonCardContent>
          </IonCard>
        </div> */}
      </IonContent>
      <IonFooter>
        <IonToolbar className="p-4 flex justify-end">
          <IonButton
            shape="round"
            onClick={handleSubmit(handleNext, handleError)}
            slot="end"
          >
            {nameChecking ? <IonSpinner name="dots" /> : <span>Next</span>}
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default CreateGroupP1;
