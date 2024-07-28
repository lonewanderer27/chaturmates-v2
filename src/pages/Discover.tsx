import { IonButtons, IonContent, IonHeader, IonPage, IonText, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { notificationsOutline, searchOutline } from 'ionicons/icons'

import AdminPostsGrid from '../components/DiscoverPage/AdminPostsGrid';
import GroupsGrid from '../components/DiscoverPage/GroupsGrid';
import NavBtn from '../components/NavBtn'
import { getAdminPosts } from '../services/group/admin';
import { getAllGroups } from '../services/groups';
import { showTabBar } from '../utils/TabBar';
import { useQuery } from '@tanstack/react-query';
import useSelfStudent from '../hooks/student';

export default function Discover() {
  const { student } = useSelfStudent();

  const query = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      console.log("useQuery");
      const res = await getAllGroups();
      await close();
      console.log("data", res.data);
      return res.data;
    },
  });

  const iaQuery = useQuery({
    queryKey: ["important_announcements"],
    queryFn: async () => {
      const res = await getAdminPosts(student!.school+"");
      console.log("adminPosts", res);
      return res.data;
    },
    enabled: !!student?.id
  })

  useIonViewWillEnter(() => {
    showTabBar();
  })

  return (
    <IonPage>
      <IonContent fullscreen className='ion-padding'>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonText slot="start" className="page-title font-poppins font-bold" color="secondary">
              Chat-Ur-Meyts
            </IonText>
            <IonButtons slot="end">
              <NavBtn
                route="/discover/search"
                icon={searchOutline}
              />
              <NavBtn
                route="/discover/inbox"
                icon={notificationsOutline}
              />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <AdminPostsGrid group={iaQuery.data} posts={iaQuery.data?.group_posts} />
        <GroupsGrid groups={query.data?.groups} />
      </IonContent>
    </IonPage>
  )
}
