import { useLogin } from "@hooks/useLogin";
import React, {useEffect} from "react";

export const Apple = () => {
  const { getAppleUser } = useLogin();

  useEffect(() => {
    const hash = window.location.hash.substr(1);
    const params = new URLSearchParams(hash);
    const code = params.get('code');
    const idToken = params.get('id_token');
    if (code && idToken) {
      getAppleUser(code, idToken)
    }
  }, []);
  return <div></div>;
};
