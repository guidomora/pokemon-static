import { Spacer, useTheme } from '@nextui-org/react'
import { Text } from "@nextui-org/react";
import Image from 'next/image';
import React from 'react'

// Para los componentes nativos de Next Ui se recomienda usar css en vez de style

const NavBar = () => {
  const { theme } = useTheme()

  return (
    <div style={{
      display: "flex",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "start",
      padding: "0px 20px",
      backgroundColor: theme?.colors.gray200.value
    }}>
      {/* Componente poderosisimo de next */}
      <Image 
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" 
      alt='icono de la app'
      width={70}
      height={70}
      />

      <Text color='white' h2>P</Text>
      <Text color='white' h3>okemon</Text>
      {/* genera un espacio, flex:1 siginifica que va a tomar todo el espacio posible
        en este caso como no hay nada lo manda al fondo */}
      <Spacer css={{ flex: 1 }} />
      <Text color='white' h3>Favoritos</Text>
    </div>
  )
}

export default NavBar