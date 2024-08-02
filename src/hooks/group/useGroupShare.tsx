import { Share } from "@capacitor/share";
import { useLocation } from "react-router";
import { Capacitor } from "@capacitor/core";

const useGroupShare = (groupId: string) => {
  const lc = useLocation();
  const handleShare = async () => {
    if (Capacitor.isNativePlatform()) {
      console.log("use native platform share")
      await Share.share({
        url: lc.pathname,
      });
    } else {
      console.log("use web platform share")
      if (navigator.share) {
        navigator.share({
          title: 'web.dev',
          text: 'Check out web.dev.',
          url: 'https://web.dev/',
        })
          .then(() => console.log('Successful share'))
          .catch((error) => {
            console.log('Error sharing', error)
          });
      }
    }
  };

  return { handleShare };
};

export default useGroupShare;
