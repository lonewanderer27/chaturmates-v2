import { IonButtons, IonContent, IonHeader, IonPage, IonText, IonToggle, IonToolbar } from '@ionic/react'
import { notificationsOutline, searchOutline } from 'ionicons/icons'

import AdminPostsGrid from '../components/DiscoverPage/AdminPostsGrid';
import GroupsGrid from '../components/DiscoverPage/GroupsGrid';
import NavBtn from '../components/NavBtn'
import { getAdminPosts } from '../services/group/admin';
import { getAllGroups } from '../services/groups';
import { useQuery } from '@tanstack/react-query';
import useSelfStudent from '../hooks/student';
import { Preferences } from '@capacitor/preferences';
import { useState, useEffect } from 'react';


export default function Discover() {
  const [darkMode, setDarkMode] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const { student } = useSelfStudent();

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    setHighContrastMode(false); // Disable high contrast mode
    document.body.classList.toggle('dark', newDarkMode);
    document.body.classList.remove('high-contrast'); // Remove high contrast class

    if (newDarkMode) {
      Preferences.set({ key: 'darkModeActivated', value: 'true' });
      Preferences.set({ key: 'highContrastModeActivated', value: 'false' });
    } else {
      Preferences.set({ key: 'darkModeActivated', value: 'false' });
    }
  };

  const toggleHighContrastMode = () => {
    const newHighContrastMode = !highContrastMode;
    setHighContrastMode(newHighContrastMode);
    setDarkMode(false); // Disable dark mode
    document.body.classList.toggle('high-contrast', newHighContrastMode);
    document.body.classList.remove('dark'); // Remove dark class

    if (newHighContrastMode) {
      Preferences.set({ key: 'highContrastModeActivated', value: 'true' });
      Preferences.set({ key: 'darkModeActivated', value: 'false' });
    } else {
      Preferences.set({ key: 'highContrastModeActivated', value: 'false' });
    }
  };

  const checkAppMode = async () => {
    const checkIsDarkMode = await Preferences.get({ key: 'darkModeActivated' });
    const isDarkMode = checkIsDarkMode?.value === 'true';
    setDarkMode(isDarkMode);
    document.body.classList.toggle('dark', isDarkMode);

    const checkIsHighContrastMode = await Preferences.get({ key: 'highContrastModeActivated' });
    const isHighContrastMode = checkIsHighContrastMode?.value === 'true';
    setHighContrastMode(isHighContrastMode);
    document.body.classList.toggle('high-contrast', isHighContrastMode);
  };

  useEffect(() => {
    checkAppMode();
  }, []);

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
              
           <IonToggle mode="ios" checked={darkMode} onIonChange={toggleDarkMode} justify="space-between">Dark Test</IonToggle>
           <IonToggle mode="ios" checked={highContrastMode} onIonChange={toggleHighContrastMode} justify="space-between">High Test</IonToggle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <AdminPostsGrid group={iaQuery.data} posts={iaQuery.data?.group_posts} />
        <GroupsGrid groups={query.data?.groups} />
      </IonContent>
    </IonPage>
  )
}
