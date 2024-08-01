import React, { useEffect } from 'react'
import { chatboxEllipsesOutline, chatboxOutline, compassOutline, compassSharp, peopleOutline, peopleSharp } from 'ionicons/icons';
import { useIonRouter, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';

import { RouteProps } from 'react-router'

const TabIconChangerWrapper = (props: RouteProps): JSX.Element => {
  const { routeInfo: { pathname } } = useIonRouter();

  useIonViewWillEnter(() => {
    const updateIcons = () => {
      const discoverTabButton = document.getElementById('discoverTabButton');
      const communityTabButton = document.getElementById('communityTabButton');
      const threadsTabButton = document.getElementById('threadsTabButton');

      if (discoverTabButton) {
        console.log(discoverTabButton);
        discoverTabButton!.querySelector('ion-icon')!.setAttribute('icon', pathname === '/discover' ? compassSharp : compassOutline);
      }

      if (communityTabButton) {
        communityTabButton.querySelector('ion-icon')!.setAttribute('icon', pathname === '/community' ? peopleSharp : peopleOutline);
      }

      if (threadsTabButton) {
        threadsTabButton.querySelector('ion-icon')!.setAttribute('icon', pathname === '/threads' ? chatboxEllipsesOutline : chatboxOutline);
      }

      console.log("Updated Icons")
    };
    

    updateIcons();
  }, [pathname]);

  return props.children as unknown as JSX.Element;
}

export default TabIconChangerWrapper