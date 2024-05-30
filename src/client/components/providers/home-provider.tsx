import React, { useEffect } from "react";
import { Route, RouterProps, Navigate } from "react-router-dom";

import { getUserId } from "@/services/user";
import axios from "axios";
import ModalProvider from "./modal-provider";
import { useAuthStore } from "@/hooks/auth/use-auth";

interface HomeProviderProps extends RouterProps {
  children: React.ReactNode;
}

const HomeProvider = ({ children, ...rest }: HomeProviderProps) => {
  const { token, loading } = useAuthStore();

  return (
    <>
      <Route {...rest}>
        {loading ? (
          <div>Loading...</div>
        ) : token ? (
          children
        ) : (
          <Navigate to={"/login"} />
        )}
      </Route>
    </>
  );
};

export default HomeProvider;
