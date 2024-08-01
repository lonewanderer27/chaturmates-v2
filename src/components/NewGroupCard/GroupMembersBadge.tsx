import { IonAvatar, IonIcon, IonBadge, IonText } from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { memo } from "react";

const GroupMembersBadge = memo((props: {
  members: { avatar_url?: string }[];
  avatar_url: boolean;
}) => {
  const membersToShow = props.members.length > 4 ? props.members.slice(0, 4) : props.members;
  const extraMembers = props.members.length > 4 ? props.members.length - 4 : 0;

  return (
    <>
      {membersToShow.map((member, index) => {
        if (member.avatar_url) {
          return (
            <IonAvatar key={"avatar:" + index} className="w-[25px] h-auto shadow-md">
              <img src={member.avatar_url} />
            </IonAvatar>
          );
        } else {
          return (
            <IonIcon
              key={"ionicon:members:" + index}
              className={`${props.avatar_url ? "text-white" : ""} shadow-md text-lg`}
              src={personCircleOutline}
            ></IonIcon>
          );
        }
      })}
      {extraMembers > 0 && (
        <IonBadge color="dark" className="ml-1 p-1 shadow-md rounded-full text-[9px] flex items-center justify-center flex-wrap">
          <IonText>+{extraMembers}</IonText>
        </IonBadge>
      )}
    </>
  )
})

export default GroupMembersBadge