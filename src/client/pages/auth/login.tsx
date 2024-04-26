import React from "react";
import AuthWrapper from "../../components/wrapper/auth-wrapper";
import LoginForm from "../../components/forms/login-form";

const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-zinc-200">
      <AuthWrapper
        heading="Project Management System"
        description="LOGIN"
        backButtonLink="/register"
        backButtonTitle="Don't have an Account"
        showSocial
      >
        <LoginForm />
      </AuthWrapper>
    </div>
  );
};

export default Login;
