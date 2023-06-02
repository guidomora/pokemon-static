// Cuando el archivo comienza con un _ es porque es algo especial de next
// Este archivo _document sirve para personalizar el doc HTML que se envia al navegador
// permitiendo agregar metadatos, estilos globales y otros contenidos a todas las pags

import { Html, Head, Main, NextScript } from 'next/document'
import { CssBaseline } from '@nextui-org/react';

export default function Document() {

  
  return (
    <Html lang="en">
      <Head>{CssBaseline.flush()}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

