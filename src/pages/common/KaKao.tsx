import { useLogin } from "@hooks/useLogin";
import React from "react";

export const KaKao = () => {
  const { getKakaoUserToken } = useLogin();
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");

  React.useEffect(() => {
    if (code) {
      getKakaoUserToken(code);
    }
  }, [code]);

  return <div></div>;
};
