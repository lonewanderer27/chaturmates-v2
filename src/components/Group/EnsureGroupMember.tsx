import React, { useState, useEffect, ComponentType } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import useAmIAMember from "../../hooks/group/useAmIAMember";
import { IonLoading } from "@ionic/react";

type GroupPagesProps = {
  vanity_url: string;
};

const EnsureMember = (
  WrappedComponent: ComponentType<RouteComponentProps<any>>,
  redirectTo: string = "/not-allowed"
) => {
  const HOC: React.FC<RouteComponentProps<GroupPagesProps>> = (props) => {
    const { data, isLoading } = useAmIAMember(props.match.params.vanity_url);

    if (isLoading) return <IonLoading isOpen />;

    return data ? (
      <WrappedComponent {...props} />
    ) : (
      <Redirect to={redirectTo} />
    );
  };

  return HOC;
};

export default EnsureMember;
