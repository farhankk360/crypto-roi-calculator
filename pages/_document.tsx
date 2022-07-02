import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <title>
            Crypto Return On Investment Calculator, Bitcoin (BTC), Ethereum
            (ETH), Binance Coin (BNB) and more...
          </title>
          <meta
            name="description"
            content="CryptoRoiCalculator allows you to calculate profit or loss on your investments."
          ></meta>
          <meta name="robots" content="index, follow"></meta>
          <link
            rel="canonical"
            href="https://www.cryptoroicalculator.com"
          ></link>
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link
            href="/icons/favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/icons/favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <meta name="theme-color" content="#475569" />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content="white"
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            content="black"
          />
          <link
            rel="apple-touch-icon"
            href="/apple-touch-icon-iphone-60x60.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            href="/images/splash/12.9__iPad_Pro_landscape.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            href="/images/splash/11__iPad_Pro__10.5__iPad_Pro_landscape.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            href="/images/splash/10.5__iPad_Air_landscape.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            href="/images/splash/10.2__iPad_landscape.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            href="/images/splash/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            href="/images/splash/iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            href="/images/splash/iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            href="/images/splash/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            href="/images/splash/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            href="/images/splash/iPhone_11__iPhone_XR_landscape.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
            href="/images/splash/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            href="/images/splash/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
            href="/images/splash/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            href="/images/splash/12.9__iPad_Pro_portrait.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            href="/images/splash/11__iPad_Pro__10.5__iPad_Pro_portrait.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            href="/images/splash/10.5__iPad_Air_portrait.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            href="/images/splash/10.2__iPad_portrait.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            href="/images/splash/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            href="/images/splash/iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            href="/images/splash/iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            href="/images/splash/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            href="/images/splash/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            href="/images/splash/iPhone_11__iPhone_XR_portrait.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
            href="/images/splash/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            href="/images/splash/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
            href="/images/splash/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
