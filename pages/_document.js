import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="AI Smart Contract Auditor" key="title"/>
        <meta property="og:description" content="AI Smart Contract Auditor" key="description"/>
        <meta
          property="og:image"
          content="../assets/audity.png"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
