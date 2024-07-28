import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonList, IonText } from "@ionic/react";

import { GroupPostTypeWGroupInfo } from "../../types/group/Post";
import PostCard from "./PostCard";
import { SEARCH_CATEGORY } from "../../enums/search";

export default function PostsResults(props: {
  posts?: GroupPostTypeWGroupInfo[];
  handleViewMore: (fromPage: SEARCH_CATEGORY) => void;
  activePage?: SEARCH_CATEGORY;
}) {
  if (!props.posts || props.posts.length === 0) {
    return <></>;
  }

  return (
    <IonCard color={props.activePage === SEARCH_CATEGORY.POST ? undefined : "light"}
      className="mx-[-20px] shadow-none rounded-2xl mt-3">
      {props.activePage !== SEARCH_CATEGORY.POST && (
        <IonCardHeader>
          <IonCardSubtitle>Posts</IonCardSubtitle>
        </IonCardHeader>
      )}

      {props.posts && props.posts.length > 0 && (
        <div className="mx-[-4px]">
          {props.activePage === SEARCH_CATEGORY.POST ? (
            <>
              {props.posts.map((post) => (
                <PostCard post={post} key={post.id} group={post.groups} />
              ))}
            </>
          ) : (
            <>
              {props.posts.slice(0, 3).map((post) => (
                <PostCard post={post} key={post.id} group={post.groups} />
              ))}
            </>
          )}
        </div>
      )}

      <IonCardContent>
        {props.posts && props.posts.length === 0 && (
          <p className="ion-padding-start">No posts found.</p>
        )}
        {props.posts && props.posts.length > 3 && (
          <IonText
            onClick={() => props.handleViewMore(SEARCH_CATEGORY.POST)}
            color="medium"
            className="cursor-pointer py-0 my-0 text-sm"
          >
            {props.activePage === SEARCH_CATEGORY.POST ? "FEWER POSTS" : "MORE POSTS"}
          </IonText>
        )}
      </IonCardContent>
    </IonCard>
  );
}
