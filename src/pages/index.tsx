import Layout from "@/components/Layout/Layout"
import { Button } from "@nextui-org/react"
import { NextPage } from 'next'
import { Inter } from 'next/font/google'


const HomePage: NextPage = () => {
  return (
      <Layout title="Listado de Pokemons">
        <h1>Hola!</h1>
        <Button color="gradient">Holaa</Button>
      </Layout>
  )
}

export default HomePage