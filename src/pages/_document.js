import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { googleFontPoppins, mapBoxStyles } from "../../content/site";
import { og } from "../../content/head";

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }
    render() {
        const backgroundImg = "/images/misc/map.png";
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="prefetch" href="/images/emojis/awkward.svg" />
                    <link rel="prefetch" href="/images/emojis/broken.svg" />
                    <link rel="prefetch" href="/images/emojis/catish.svg" />
                    <link rel="prefetch" href="/images/emojis/cheeky.svg" />
                    <link rel="prefetch" href="/images/emojis/content.svg" />
                    <link rel="prefetch" href="/images/emojis/crying.svg" />
                    <link rel="prefetch" href="/images/emojis/happy.svg" />
                    <link rel="prefetch" href="/images/emojis/mute.svg" />
                    <link rel="prefetch" href="/images/emojis/neutral.svg" />
                    <link rel="prefetch" href="/images/emojis/shy.svg" />
                    <link rel="prefetch" href="/images/emojis/sleepy.svg" />
                    <link rel="prefetch" href="/images/emojis/smiley.svg" />
                    <link rel="prefetch" href={backgroundImg} />
                    <link rel="stylesheet" href={mapBoxStyles} />
                    <link rel="stylesheet" href={googleFontPoppins} />
                    <meta property="og:title" content="stumbly.io" />
                    <meta property="og:site_name" content="stumbly.io" />
                    <meta property="og:url" content={og.url} />
                    <meta property="og:description" content={og.description} />
                    <meta property="og:type" content="website" />
                    <meta property="og:image" content={og.img} />
                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:description" content={og.description} />
                    <meta name="twitter:title" content="stumbly.io" />
                    <meta name="twitter:image" content={og.img} />
                    <meta name="description" content={og.description} />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=G-X3HRS9H4W1"
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            
                            gtag('config', 'G-X3HRS9H4W1');`,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
