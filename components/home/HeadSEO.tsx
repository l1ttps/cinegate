import Head from "next/head";
import Script from "next/script";

const HeadSEO = () => {
  return (
    <div>
      <Head>
        <title>
          CineGate - Watch HD movies online for free - Highest Rated Movies
          Recommendation
        </title>
        <meta name="theme-color" content="#141414" />

        <meta name="robots" content="all" />
        <meta name="googlebot" content="noindex,nofollow" />
        <meta
          name="keywords"
          content="CineGate, CineGate app, cinegate download, download cinegate, cinegate pc ,Watch online, Watch for Free, Watch dramas for free, cinegate ios, cinegate android, cinegate for ios, cinegate for android, cinegate android tv, cinegate chromecast, kdrama, k-drama, korean drama, box office, american movies, western movies, blockbuster movies, thailand movies, thai movies, TV drama, TV series, anime, animation, cartoon, variety show, yaoi, yuri, bl, gl, hollywood, bollywood, zombie, one piece, naruto, love affair, all of us are dead"
        ></meta>
        <meta
          name="og:title"
          content="CineGate Watch HD movies online for free"
        ></meta>

        <meta property="og:url" content="https://cinegate.online" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={"../../public/cinegate.png"} />
        <meta name="twitter:card" content="summary" />
        <meta
          name="og:description"
          content="Popular episodes updated quickly,American hot seriesTension, comedy, thriller,Newest hottest dramasall in CineGate"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-PDQWL0FWDR');
        `}
      </Script>
    </div>
  );
};

export default HeadSEO;
