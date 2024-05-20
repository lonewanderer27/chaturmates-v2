import "./ItemListButton.css";

import { IonBadge, IonButton, IonIcon, IonText } from "@ionic/react";

import { ComponentProps } from "react";

type IonButtonProps = ComponentProps<typeof IonButton>;

export default function ItemListButton(
  props: IonButtonProps & {
    buttonIcon?: string;
    buttonLabel?: string;
  }
) {
  return (
    <IonBadge slot="end" className="rounded-3xl" {...props}>
      {props.buttonIcon && (
        <IonIcon
          slot="start"
          icon={props.buttonIcon}
          className=" text-3xl m-1"
        ></IonIcon>
      )}
      {props.buttonLabel && (
        <IonText className="px-3">
          {props.buttonLabel && (
            <span className=" font-poppins font-medium text-xs">
              {props.buttonLabel}
            </span>
          )}
        </IonText>
      )}
    </IonBadge>
  );
}
