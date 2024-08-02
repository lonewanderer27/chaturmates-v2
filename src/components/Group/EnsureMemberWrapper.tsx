import { FC } from "react";
import { RouteComponentProps, RouteProps } from "react-router";
import useAmIAMember from "../../hooks/group/useAmIAMember";

type GroupRouteProps = {
  vanity_url: string;
};
const EnsureMemberWrapper: FC<RouteComponentProps<GroupRouteProps>> = (props) => {
  const { data, isLoading } = useAmIAMember(props.match.params.vanity_url);
  if (isLoading) return null;

  if (
    props.match.url.startsWith("/group") &&
    !props.match.url.includes("/preview") &&
    data
  ) {
    return props.children; ;
  }
};
