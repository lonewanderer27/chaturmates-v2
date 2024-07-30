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
  IonLabel,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";

import { NewGroupInputs } from "../../../../types/group/NewGroup";
import { RouteComponentProps } from "react-router";
import client from "../../../../client";
import { newGroupAtom } from "../../../../atoms/group";
import { useAtom } from "jotai";
import { yupResolver } from "@hookform/resolvers/yup";

const CreateGroupP2: React.FC<RouteComponentProps> = ({ match }) => {
  const rt = useIonRouter();
  const validationSchema = object().shape({
    avatar_url: string().optional().url("Must be a valid photo url"),
    cover_url: string().optional().url("Must be a valid photo url"),
    vanity_id: string().required("Vanity ID is required").min(2),
  });
  const [checkingUrl, setCheckingUrl] = useState(() => false);
  const [newGroup, setNewGroup] = useAtom(newGroupAtom);

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    clearErrors,
    getFieldState,
    getValues,
    formState: { errors },
    control,
  } = useForm<NewGroupInputs["step2"]>({
    resolver: yupResolver(validationSchema),
    defaultValues: newGroup.step2,
  });

  const handleError: SubmitErrorHandler<NewGroupInputs["step2"]> = (
    errors,
    event
  ) => {
    console.log("handleError");
    console.log(errors);
  };

  const handleNext: SubmitHandler<NewGroupInputs["step2"]> = async (
    data
  ) => {
    setCheckingUrl(() => true);
    console.log("handleNext");
    console.log(data);

    // set avatar and cover url in the atom
    setNewGroup((prev) => {
      return {
        ...prev,
        step2: data,
      };
    });

    // check if the vanity url exists
    console.log("checking if the vanity url is unique");
    const res = await client
      .from("groups")
      .select("vanity_id")
      .ilike("vanity_id", data.vanity_id);

    console.log(res);

    setCheckingUrl(() => false);

    // if a group already exists, then the vanity url is not unique
    if (res.data!.length > 0) {
      console.log("vanity url is not unique");
      setError("vanity_id", {
        type: "value",
        message:
          "This ID is already taken. Please choose another one.",
      });

      return;
    }

    if (res.error) {
      console.log(res.error.message);
      return;
    }

    // there's no group, that means the vanity url is unique
    rt.push("/"+match.path.split("/")[1]+"/group/create/p3", "forward");
  };

  return (
    <IonPage>
      
      <IonContent fullscreen className="ion-padding">
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={match.path.split("/")[1]+"/groups/create/p1"} />
          </IonButtons>
          <IonTitle>Customize {newGroup.step1.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Avatar
                </IonText>
              </IonLabel>
              <IonInput
                className={`custom my-2 text-lg ${getFieldState("avatar_url").isTouched ? "ion-touched" : ""
                  } ${errors.avatar_url
                    ? "ion-touched ion-invalid border-red-500"
                    : ""
                  }`}
                placeholder={`Profile Photo of ${newGroup.step1.name}`}
                type="text"
                errorText={getFieldState("avatar_url").error?.message}
                {...register("avatar_url")}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Cover URL
                </IonText>
              </IonLabel>
              <IonInput
                className={`custom my-2 text-lg ${getFieldState("cover_url").isTouched ? "ion-touched" : ""
                  } ${errors.cover_url
                    ? "ion-touched ion-invalid border-red-500"
                    : ""
                  }`}
                placeholder={`Cover Photo of ${newGroup.step1.name}`}
                errorText={getFieldState("cover_url").error?.message}
                {...register("cover_url")}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Vanity ID
                </IonText>
              </IonLabel>
              <IonInput
                className={`custom my-2 text-lg ${getFieldState("vanity_id").isTouched ? "ion-touched" : ""
                  } ${errors.vanity_id
                    ? "ion-touched ion-invalid border-red-500"
                    : ""
                  }`}
                placeholder={`Vanity ID of ${newGroup.step1.name}`}
                errorText={getFieldState("vanity_id").error?.message}
                {...register("vanity_id")}
              ></IonInput>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div className="m-[-5px]">
          <IonCard>
            <IonCardContent>This will serve as {newGroup.step1.name}'s Invite ID</IonCardContent>
          </IonCard>
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar className="p-5">
          <IonButton
            shape="round"
            className="font-poppins font-bold"
            onClick={handleSubmit(handleNext, handleError)}
            slot="end"
          >
            {checkingUrl ? <IonSpinner name="dots" /> : <span>Next</span>}
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}

export default CreateGroupP2;