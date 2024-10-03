const ErrorPage = () => {};
export default ErrorPage;

export async function getServerSideProps() {
  return {
    redirect: {
      destination: `/`,
      permanent: false,
    },
  };
}
