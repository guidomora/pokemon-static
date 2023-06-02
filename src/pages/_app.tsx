import '@/styles/globals.css'
import { darkTheme } from '@/themes/darkTheme'
import { NextUIProvider } from '@nextui-org/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    // Envolvemos la app en el provider de next UI
    // Ponemos el darkTheme
    <NextUIProvider theme={darkTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )

}
