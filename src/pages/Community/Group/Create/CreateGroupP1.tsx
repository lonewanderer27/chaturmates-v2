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
} from "@ionic/react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";

import { NewGroupInputs } from "../../../../types/group/NewGroup";
import { RouteComponentProps } from "react-router";
import client from "../../../../client";
import { newGroupAtom } from "../../../../atoms/group";
import { useAtom } from "jotai";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

const CreateGroupP1: React.FC<RouteComponentProps> = ({ match }) => {
  const [show, dismiss] = useIonAlert();
  const rt = useIonRouter();
  const validationSchema = object().shape({
    name: string().required("Name of the group is required").min(3),
    description: string()
      .required("Description of the group is required")
      .min(3),
  });
  const [nameChecking, setNameChecking] = useState(() => false);
  const [newGroup, setNewGroup] = useAtom(newGroupAtom);

  const {
    register,
    handleSubmit,
    setError,
    getFieldState,
    formState: { errors },
  } = useForm<NewGroupInputs["step1"]>({
    resolver: yupResolver(validationSchema),
    defaultValues: newGroup.step1
  });

  const handleError: SubmitErrorHandler<NewGroupInputs["step1"]> = (
    errors,
    event
  ) => {
    console.log("handleError");
    console.log(errors);
  };

  const handleNext: SubmitHandler<NewGroupInputs["step1"]> = async (
    data
  ) => {
    setNameChecking(() => true);
    console.log("handleNext");
    console.log(data);

    // set group name and description in the atom
    setNewGroup((prev) => {
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

    setNameChecking(() => false);

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
        buttons: ['OK']
      });
      return;
    }

    // there's no group, that means the name is unique
    rt.push("/"+match.path.split("/")[1]+"/group/create/p2", "forward");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={"/"+match.path.split("/")[1]} />
          </IonButtons>
          <IonTitle>Create Group</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Name
                </IonText>
              </IonLabel>
              <IonInput
                className={`custom my-2 text-lg ${getFieldState("name").isTouched ? "ion-touched" : ""
                  } ${errors.name ? "ion-touched ion-invalid border-red-500" : ""
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
                className={`custom my-2 text-lg ${getFieldState("name").isTouched ? "ion-touched" : ""
                  } ${errors.description ? "ion-touched ion-invalid border-red-500" : ""
                  }`}
                errorText={getFieldState("description").error?.message}
                placeholder="Description of your group"
                {...register("description")}
              ></IonTextarea>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div className="m-[-5px]">
          <IonCard>
            <IonCardContent>
              <IonText>Anyone can see who's in the group.</IonText>
            </IonCardContent>
          </IonCard>
          <IonCard className="mt-0">
            <IonCardContent>
              <IonText>Chat links and posts of the group can only be seen by the members.</IonText>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar className="p-5">
          <IonButton
            className="font-poppins font-bold"
            onClick={handleSubmit(handleNext, handleError)}
            slot="end"
          >
            {nameChecking ? <IonSpinner name="dots" /> : <span>Next</span>}
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}

export default CreateGroupP1;