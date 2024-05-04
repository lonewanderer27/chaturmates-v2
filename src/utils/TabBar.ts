export const hideTabBar = (): void => {
  const tabBar = document.getElementsByTagName("ion-tab-bar")[0];
  if (tabBar !== null) {
    tabBar.style.display = "none";
  }
};

export const showTabBar = (): void => {
  const tabBar = document.getElementsByTagName("ion-tab-bar")[0];
  if (tabBar !== null) {
    tabBar.style.display = "flex";
  }
};
