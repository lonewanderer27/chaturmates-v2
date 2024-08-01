import { createAnimation } from "@ionic/react";

export const hideTabBar = (): void => {
  const tabBar = document.getElementsByTagName('ion-tab-bar')[0];
  if (tabBar !== null && tabBar.style.display !== 'none') {
    console.log('Hiding tab bar');

    const animation = createAnimation()
      .addElement(tabBar)
      .duration(500)
      .easing("ease-in")
      .fromTo('transform', 'translateY(0)', 'translateY(100%)')
      .onFinish(() => {
        tabBar.style.display = 'none';
      });

    animation.play();
  }
};

export const showTabBar = (): void => {
  const tabBar = document.getElementsByTagName('ion-tab-bar')[0];
  if (tabBar !== null && tabBar.style.display !== 'flex') {
    console.log('Showing tab bar');
    tabBar.style.display = 'flex';

    const animation = createAnimation()
      .addElement(tabBar)
      .duration(500)
      .easing("ease-in")
      .fromTo('transform', 'translateY(100%)', 'translateY(0)');

    animation.play();
  }
};
