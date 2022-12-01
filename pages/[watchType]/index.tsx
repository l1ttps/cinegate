import { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/Layout";

interface WatchProps {
  watchType: "TV" | "Movie";
}
const Watch: NextPage<WatchProps> = (props) => {
  console.log(props);

  return (
    <Layout>
      <>{props.watchType}</>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const watchType = ctx?.params?.watchType;
  const props = {
    watchType,
  };
  return {
    props,
  };
};

export default Watch;
