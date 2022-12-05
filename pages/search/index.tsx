import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { searchWithKeyWord } from "../../api/services/search";
import Layout from "../../components/Layout";
import CardHorizontal from "../../components/UI/CardHorizontal";
import { SearchResult } from "../../shared/types";

const Search: NextPage = () => {
  const router = useRouter();
  const { q } = router.query;
  const [result, setResult] = useState<SearchResult[]>([]);

  useEffect(() => {
    console.log("rin");

    (async () => {
      if (q && q.length > 0) {
        const response = await searchWithKeyWord(q as string);
        setResult(response);
        console.log(response);
      }
    })();
  }, [q]);

  return (
    <Layout title={`Result for "${q}"`}>
      <>
        <Head>
          <title>{`Result for "${q}"`}</title>
        </Head>
        <div className="grid grid-cols-1 gap-5 my-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {result.map((movie) => (
            <div key={movie.id} className="w-full">
              <CardHorizontal
                coverHorizontalUrl={movie.coverHorizontalUrl}
                name={movie.name}
                id={movie.id}
                category={movie.domainType}
              />
              <div className="w-full mt-3 font-bold truncate">
                <span>{movie.name}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    </Layout>
  );
};

export default Search;
