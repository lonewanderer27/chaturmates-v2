import { IonCard, IonIcon, IonText, useIonRouter } from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { isValidUrl } from "../../utils/ValidUrl";
import { RecommendedStudentType } from "../../services/recommend";
import { formatYearLevel } from "../../pages/Recommend/RecommendStudents";
import { memo } from "react";

const RecommendedStudentCard = (props: { student: RecommendedStudentType }) => {
  const rt = useIonRouter();
  const handleClick = () => {
    rt.push("/discover/student/id/" + props.student.id);
  };

  return (
    <IonCard className="m-0 w-full ion-padding" onClick={handleClick}>
      <div className="flex justify-center py-8 bg-slate-300 rounded-lg h-36">
        {props.student.avatar_url &&
        isValidUrl(props.student.avatar_url + "") ? (
          <img
            className="rounded-full w-[80px] h-auto mx-auto"
            src={props.student.avatar_url!}
          />
        ) : (
          <IonIcon className="text-8xl" src={personCircleOutline}></IonIcon>
        )}
      </div>
      <div>
        <IonText>
          <h6 className="font-bold font-poppins">
            {props.student.full_name?.split(" ")[0]}
          </h6>
          {props.student.course && (
            <p className="mt-[-10px]">{props.student.course.title.replace("B.S. in", "")}</p>
          )}
          <div>
            {props.student.year_level && (
              <span>{formatYearLevel(props.student.year_level)} Year</span>
            )}
            {props.student.type === "regular" && props.student.block && (
              <span>
                {" | "}
                {props.student.block}
              </span>
            )}
            {props.student.type === null && <span>{" | "}Irregular</span>}
          </div>
        </IonText>
      </div>
    </IonCard>
  );
};

export default memo(RecommendedStudentCard);
