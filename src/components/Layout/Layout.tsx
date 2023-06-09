import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import NavBar from "../ui/NavBar"



interface Props {
  title?: string
}

const Layout = ({ children, title }: PropsWithChildren<Props>) => {

  // Solo existe si estamos trabajando en el front end
  // origin nos va a devolver el nombre del dominio
  const origin = (typeof window === "undefined") ? "" : window.location.origin
  
  
  
  return (
    <>
      <Head>
        <title>{title || "PokemonApp"}</title>
        <meta name='author' content='Guido Morabito' />
        <meta name='description' content={`Info sobre el pokemon ${title}`} />
        <meta name='keywords' content={`${title}, pokemon, pokedex`} />
        
        {/* Meta tags Open Graph */}
        <meta property="og:title" content={`Informacion sobre ${title}`} />
        <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />

        {/* Reemplazamos parte del path de la imagen por el window.location.origin */}
        <meta property="og:image" content={`${origin}/img/pokeBanner.png`} />
      </Head>
      <NavBar />
      <main style={{ padding: "0px 20px" }}>
        {children}
      </main>
    </>
  )
}

export default Layout