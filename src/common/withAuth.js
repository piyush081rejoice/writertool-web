import React, { useEffect } from "react";
import { useRouter } from "next/router";
import cookies from "next-cookies";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    useEffect(() => {
      if (!props.userToken) {
        router.push("/login");
      }
    }, [props.userToken]);

    return props.userToken ? <WrappedComponent {...props} /> : null;
  };
};

export const getServerSideProps = (context) => {
  const { userToken } = cookies(context);
  return {
    props: { userToken: userToken || null },
  };
};

export default withAuth;
