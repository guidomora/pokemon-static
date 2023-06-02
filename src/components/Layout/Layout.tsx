import Head from 'next/head'
import React, {  PropsWithChildren } from 'react'
import NavBar from "../ui/NavBar"


interface Props {
    title?:string
}

const Layout = ({children, title}:PropsWithChildren<Props>) => {
  return (
    <>
        <Head>
            <title>{title || "PokemonApp"}</title>
            <meta name='author' content='Guido Morabito' />
            <meta name='description' content={`Info sobre el pokemon ${title}`} />
            <meta name='keywords' content={`${title}, pokemon, pokedex`} />
        </Head>
        <NavBar />
        <main style={{padding: "0px 20px"}}>
            {children}
        </main>
    </>
  )
}

export default Layout