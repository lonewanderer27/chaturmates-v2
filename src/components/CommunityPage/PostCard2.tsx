// import { IonCard, IonList, IonItem, IonLabel, IonIcon, IonText } from '@ionic/react'
// import { personCircleOutline } from 'ionicons/icons'
// import React from 'react'
// import { isValidUrl } from '../../utils/ValidUrl'

// const PostCard2 = () => {
//   <IonCard
//       className="m-2 font-poppins px-0 pb-4"
//       onClick={handleClick}
//     >
//       {/* <IonRow>
//         {props.group?.admin_uni_group === false && <IonCol size="2">
//           <IonIcon
//             className="postIcon ml-[-10px] text-5xl"
//             src={props.icon}
//           ></IonIcon>
//         </IonCol>}
//         <IonCol className="flex content-center">
//           <IonText className="ml-[-5px]">
//             <span className="text-xl font-bold text-ellipsis line-clamp-1 my-auto">
//               {props.group?.name ?? "Post"}
//             </span>
//           </IonText>
//         </IonCol>
//       </IonRow> */}
//       <IonList className="mx-[-10px]">
//         <IonItem lines="none">
//           <IonLabel slot="start">
//             <div className="avatar">
//               {isValidUrl(props..avatar_url + "") ? (
//                 <img src={m.avatar_url + ""} />
//               ) : (
//                 <IonIcon className="text-3xl m-[-3px]" icon={personCircleOutline} />
//               )}
//             </div>
//           </IonLabel>
//         </IonItem>
//         <IonItem lines="none">
//           <IonText>
//             <p className="line-clamp-3 text-sm">{props.post?.content}</p>
//           </IonText>
//         </IonItem>
//       </IonList>
//     </IonCard>
// }

// export default PostCard2