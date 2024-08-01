import { useIonViewWillEnter } from '@ionic/react';
import { hideTabBar } from '../utils/TabBar';

const useHideTabs = () => {
  useIonViewWillEnter(() => {
    hideTabBar();
  })
}

export default useHideTabs