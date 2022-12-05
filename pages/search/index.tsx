import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const Search: NextPage = () => {
  const router = useRouter();
  const { q } = router.query;
  return (
    <Layout title={`Result for "${q}"`}>
      <div></div>
    </Layout>
  );
};

export default Search;
