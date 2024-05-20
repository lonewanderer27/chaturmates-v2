import { hideTabBar, showTabBar } from '../utils/TabBar';

import { useEffect } from 'react'

const useHideTabs = () => {
  useEffect(() => {
    // hide tab bar 
    hideTabBar();

    // upon unmount, show tab bar
    return () => {
      showTabBar();
    }
  }, [])
}

export default useHideTabs