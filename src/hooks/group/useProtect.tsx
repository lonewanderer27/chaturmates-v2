import useAmIAMember from "./useAmIAMember";
import { useIonRouter } from "@ionic/react";

const useProtect = (group_vanity_id: string) => {
  const rt = useIonRouter();
  const { data, isLoading } = useAmIAMember(group_vanity_id);

  if (!rt.routeInfo.pathname.includes("preview")) {
    if (isLoading) return null;
    if (!data) {
      rt.push(`${rt.routeInfo.pathname}/preview`, "forward", "replace");
      return null;
    }
    if (data && data?.approved === false) {
      rt.push(`${rt.routeInfo.pathname}/preview`, "forward", "replace");
      return null;
    }
  }
};

export default useProtect;
