import React from "react";
import CardWrapper, { CardWrapperProps } from "./card-wrapper";
import { CardContent, CardFooter, CardHeader } from "../ui/card";
import Heading from "../ui/heading";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import SocialLogin from "../features/social-login";

interface AuthWrapperProps extends CardWrapperProps {
  heading: string;
  description: string;
  backButtonLink: string;
  backButtonTitle: string;
  showSocial?: boolean;
}

const AuthWrapper = (props: AuthWrapperProps) => {
  return (
    <CardWrapper className={props.className}>
      <CardHeader>
        <Heading title={props.heading} description={props.description} />
      </CardHeader>
      <CardContent>{props.children}</CardContent>
      {props.showSocial && (
        <CardFooter>
          <SocialLogin />
        </CardFooter>
      )}
      <CardFooter>
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
          <Link to={props.backButtonLink}>{props.backButtonTitle}</Link>
        </Button>
      </CardFooter>
    </CardWrapper>
  );
};

export default AuthWrapper;
