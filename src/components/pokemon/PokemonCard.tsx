import { SmallPokemon } from "@/interfaces/pokemon-list"
import { Card, Grid, Row, Text } from "@nextui-org/react"
import { useRouter } from "next/router"
import { FC } from "react"

interface Props {
    pokemon: SmallPokemon
}
const PokemonCard: FC<Props> = ({ pokemon }) => {
    const router =useRouter()

    // Le mandamos la query al router y nos direcciona a la url con ese id
    const onCLick = () => {
        router.push(`/pokemon/${pokemon.id}`)
    }


    return (
        // Se divide como bootstrap en 12 columnas
        <Grid key={pokemon.id} xs={6} sm={3} md={2} xl={1}>
            <Card onClick={onCLick} isHoverable isPressable css={{ p: 1 }}>
                <Card.Body>
                    <Card.Image
                        src={pokemon.img}
                        width="100%"
                        height={140}
                    />
                </Card.Body>
                <Card.Footer>
                    <Grid justify="space-between">
                        <Text transform="capitalize">
                            {pokemon.name}
                        </Text>
                        #{pokemon.id}
                    </Grid>
                </Card.Footer>
            </Card>
        </Grid>
    )
}

export default PokemonCard