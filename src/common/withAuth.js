import { parse } from "cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
  const { req } = context;
  const cookies = parse(req?.headers?.cookie || "");
  const userToken = cookies?.userToken;
  
  return {
    props: { userToken: userToken || null },
  };
};

export default withAuth;
